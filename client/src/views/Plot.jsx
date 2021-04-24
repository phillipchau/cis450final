import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCountPerStateDate, getDistinctStates, TypeCount } from '../api/StateCount';
import OptionsSidebar from '../components/core/Options';
import { FlexContainer, ChildFlexContainer } from '../components/core/Container';
import getFormattedDate from '../util/Utility';
import ErrorMessage from '../components/core/Error';
import { LandingHeaderText } from '../components/core/Text';

// Helper function to determine if two dates are the same.
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

const LoadingChart = styled.div`
  background: white;
  position: relative;
  width: 600px;
  height: 400px;
`;

const LoadingChartText = styled(LandingHeaderText)`
  vertical-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function PlotPage() {

  // Hold the data retrieved by the database.
  const [distinctStates, setDistinctStates] = useState();
  
  // Hold the data retrieved by the database.
  const [countPerStateDate, setCountPerStateDate] = useState();

  // Hold the formatted plot data to be displayed.
  const [plotData, setPlotData] = useState();

  // Specifies whether the plot holds cases or deaths information.
  const [typeCount, setTypeCount] = useState(TypeCount.CASES);

  // Hold the starting and ending dates.
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);

  // Hold error text.
  const [error, setError] = useState('');

  // Hold loading boolean.
  const [loading, setLoading] = useState(true);

  // The states to shown on the plot.
  const [selectedStates, setSelectedStates] = useState([]);
  
  // All of the states available on the plot.
  const [selectedStatesOptions, setSelectedStatesOptions] = useState([]);

  // Setting the state options.
  useEffect(() => {
    if (distinctStates !== undefined) {
      let options = [];
      distinctStates.forEach((state) => {
        options.push({
          label: state.State,
          value: state.State
        });
      });
      setSelectedStatesOptions(options);

      // Initially, include all states.
      setSelectedStates(options);
    }
  }, [distinctStates]);

  // Submit the options shown on the sidebar.
  const submitOptions = useCallback((typeCountParam, startDateParam, endDateParam, selectedStatesParam) => {
    setError('');
    setLoading(true);
    setTypeCount(typeCountParam);
    setStartDate(startDateParam);
    setEndDate(endDateParam);
    setSelectedStates(selectedStatesParam);
  }, [setTypeCount, setStartDate, setEndDate, setSelectedStates]);

  // Get the states data.
  useEffect(() => {
    if (distinctStates === undefined) {
      // Get the distinct states to be displayed.
      getDistinctStates().then((res) => {
        console.log(res);
        setDistinctStates(res);
        setSelectedStates(res);
      }).catch((err) => {
        setError(err.message);
      });
    } else if (selectedStates.length > 0) {
      // Format the selected states.
      let selectedStatesList = [];
      selectedStates.forEach((state) => {
        selectedStatesList.push(state.value);
      });
      let selectedStatesStr = `'${selectedStatesList.join("', '")}'`;

      // Get the count data.
      let params = {
        typeCount: typeCount,
        startDate: getFormattedDate(startDate),
        endDate: getFormattedDate(endDate),
        selectedStatesStr: selectedStatesStr,
      };
      getCountPerStateDate(params).then((res) => {
        console.log(res);
        setCountPerStateDate(res);
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [typeCount, startDate, endDate, selectedStates, distinctStates]);

  // Helper method to add the state's count.
  const addStateCount = (states, currentStateIndex, data, count) => {
    // Add 0 until we get to the correct state.
    while (states[currentStateIndex] !== data.State) {
      count.push(0);
      currentStateIndex++;
    }

    // Add the current state's count, and increment.
    count.push(data.Count);
    currentStateIndex++;
    return currentStateIndex;
  };

  // Construct the plot data to be displayed.
  useEffect(() => {
    // Only load the plot once all variables are defined.
    if (startDate !== undefined && endDate !== undefined && distinctStates !== undefined && countPerStateDate !== undefined) {
      // The plot data to be saved.
      let newPlotData = [];

      // Get the list of states to be included. This can be modified.
      let states = [];
      distinctStates.forEach((data) => {
        states.push(data.State);
      });

      // Add the 'Date' as the first entry for x-axis description.
      states.unshift('Date');
      newPlotData.push(states);

      // Iterate through the plot data, for every new date, construct the list.
      let currentDate = startDate;
      let currentStateIndex = 1;
      let count = [currentDate];
      countPerStateDate.forEach((data) => {
        if (sameDay(currentDate, new Date(data.Date))) {
          currentStateIndex = addStateCount(states, currentStateIndex, data, count);
        } else {
          // Add 0 until there is no state date left to add.
          while (currentStateIndex < states.length) {
            count.push(0);
            currentStateIndex++;
          }

          // Reset variables, then add new state.
          newPlotData.push(count);
          currentDate = new Date(data.Date);
          currentStateIndex = 1;
          count = [currentDate];
          currentStateIndex = addStateCount(states, currentStateIndex, data, count);
        }
      });

      // Print to console for debugging.
      console.log(newPlotData);

      // Set the new plot data.
      setPlotData(newPlotData);

      // Display the plot.
      setLoading(false);
    }
  }, [setPlotData, distinctStates, countPerStateDate, startDate, endDate]);

  return (
    <FlexContainer>
      <OptionsSidebar
        selectedStatesOptions={selectedStatesOptions}
        onSubmit={submitOptions}
      />
      <ChildFlexContainer
        flex={7}
      >
        { loading ? <LoadingChart><LoadingChartText>Loading Chart...</LoadingChartText></LoadingChart> : null }
        { !loading && plotData !== undefined ?
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<LoadingChart><LoadingChartText>Loading Chart...</LoadingChartText></LoadingChart>}
            data={plotData}
            options={{
              title: `${typeCount === TypeCount.CASES ? 'Cases' : 'Deaths'} by State over Time`,
              hAxis: {
                title: 'Date',
              },
              vAxis: {
                title: (typeCount === TypeCount.CASES ? 'Cases' : 'Deaths'),
                viewWindow: {
                  min: 0,
                },
              },
              series: {
                1: { curveType: 'function' },
              },
            }}
            rootProps={{ 'data-testid': '2' }}
          />
          : null
        }
        { error ? <ErrorMessage message={error} /> : null }
      </ChildFlexContainer>
    </FlexContainer>
  );
}

export default PlotPage;

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCountPerStateDate, getDistinctStates, TypeCount } from '../api/StateCount';
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

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.25rem 0;
`;

const Input = styled.input`
  display: block;
`;

const MinimalLabel = styled.label`
  display: block;
  margin: 0.25rem 0;
`;

const InlineInput = styled.input`
  display: inline-block;
  margin-left: 5px;
`;

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

  // Specifies whether the plot holds cases or deaths information.
  const [typeCount, setTypeCount] = useState(TypeCount.CASES);

  // Hold the formatted plot data to be displayed.
  const [plotData, setPlotData] = useState();

  // Hold the starting and ending dates.
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);

  // Hold loading boolean.
  const [loading, setLoading] = useState(true);

  // Hold error text.
  const [error, setError] = useState('');

  // Get the states data.
  useEffect(() => {
    setError('');
    setLoading(true);

    // Get the distinct states to be displayed.
    getDistinctStates().then((res) => {
      console.log(res);
      setDistinctStates(res);
    }).catch((err) => {
      setError(err.message);
    });

    // Get the count data.
    let params = {
      typeCount: typeCount,
      startDate: getFormattedDate(startDate),
      endDate: getFormattedDate(endDate),
    };
    getCountPerStateDate(params).then((res) => {
      console.log(res);
      setCountPerStateDate(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [typeCount, startDate, endDate]);

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
      <ChildFlexContainer>
        <h5>Date Range</h5>

        <Label htmlFor="start-date-input">Start</Label>
        <Input type="date" value={getFormattedDate(startDate)} id="start-date-input" onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate <= endDate) {
            setStartDate(newDate);
          } else {
            setError('The date must have data in the database and be before the ending date.');
          }
        }} />

        <Label htmlFor="end-date-input" >End</Label>
        <Input type="date" value={getFormattedDate(endDate)} id="end-date-input" onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay && newDate >= startDate) {
            setEndDate(newDate);
          } else {
            setError('The date must have data in the database and be after the starting date.');
          }
        }} />

        <br></br>
        <h5>Filters</h5>
        <MinimalLabel>
          Count Cases
          <InlineInput
            name="Count Cases"
            type="checkbox"
            checked={typeCount === TypeCount.CASES}
            onChange={() => setTypeCount(TypeCount.CASES)}
          />
        </MinimalLabel>
        <MinimalLabel>
          Count Deaths
          <InlineInput
            name="Count Deaths"
            type="checkbox"
            checked={typeCount === TypeCount.DEATHS}
            onChange={() => setTypeCount(TypeCount.DEATHS)}
          />
        </MinimalLabel>
        { error ? <ErrorMessage message={error} /> : null }
      </ChildFlexContainer>
      <ChildFlexContainer>
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
      </ChildFlexContainer>
    </FlexContainer>
  );
}

export default PlotPage;

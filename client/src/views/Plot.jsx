import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCountPerStateDate, getDistinctStates, TypeCount } from '../api/StateCount';
import { Ethnicities, getCaseEthnicityQuantile } from '../api/CaseDemographics';
import { OptionsSidebar, OptionsTab } from '../components/core/Options';
import { FlexContainer, ChildFlexContainer } from '../components/core/Container';
import getFormattedDate from '../util/Utility';
import ErrorMessage from '../components/core/Error';
import { LoadingContainerText } from '../components/core/Text';

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

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function PlotPage() {

  // Hold error text.
  const [error, setError] = useState('');

  // Hold loading boolean.
  const [loading, setLoading] = useState(true);

  // Hold the formatted plot data to be displayed.
  const [plotData, setPlotData] = useState();

  // Hold the formatted plot data to be displayed.
  const [optionsTab, setOptionsTab] = useState(OptionsTab.STATES);

  /**
   * States Tab
   */

  // Hold the data retrieved by the database.
  const [distinctStates, setDistinctStates] = useState();  

  // Specifies whether the plot holds cases or deaths information.
  const [typeCount, setTypeCount] = useState(TypeCount.CASES);

  // All of the states available on the plot.
  const [selectedStatesOptions, setSelectedStatesOptions] = useState([]);

  /**
   * Demographics Tab
   */

  // Specifies the ethnicity that the plot describes.
  const [ethnicity, setEthnicity] = useState(Ethnicities.HISPANIC);

  // Helper method to add the state's count.
  const addStateCount = (states, currentStateIndex, data, count, currentDate) => {
    // Add 0 until we get to the correct state.
    while (states[currentStateIndex] !== data.State) {
      count.push(0);
      currentStateIndex++;
      if (states.indexOf(data.State) < currentStateIndex) {
        console.log(states.indexOf(data.State));
        console.log(currentStateIndex);
        console.log(currentDate);
        return 0;
      }
    }

    // Add the current state's count, and increment.
    count.push(data.Count);
    currentStateIndex++;
    return currentStateIndex;
  };

  // Construct the plot data to be displayed for the states tab.
  const displayStatesPlotData = useCallback((startDateParam, selectedStatesParam, countPerStateDateParam) => {
    // The plot data to be saved.
    let newPlotData = [];

    // Get the list of states to be included. This can be modified.
    let states = [];
    selectedStatesParam.forEach((state) => {
      states.push(state.value);
    });
    states.sort();

    // Add the 'Date' as the first entry for x-axis description.
    states.unshift('Date');
    newPlotData.push(states);

    // Iterate through the plot data, for every new date, construct the list.
    let currentDate = new Date(startDateParam);
    currentDate.setDate(currentDate.getDate() - 1);
    let currentStateIndex = 1;
    let count = [currentDate];
    countPerStateDateParam.forEach((data) => {
      if (sameDay(currentDate, new Date(data.Date))) {
        currentStateIndex = addStateCount(states, currentStateIndex, data, count, currentDate);
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
        currentStateIndex = addStateCount(states, currentStateIndex, data, count, currentDate);
      }
    });

    // Print to console for debugging.
    console.log(newPlotData);

    // Set the new plot data.
    setPlotData(newPlotData);

    // Display the plot.
    setLoading(false);
  }, [setPlotData]);

  // Get the states data.
  const getCountStateData = useCallback((typeCountParam, startDateParam, endDateParam, selectedStatesParam) => {
    // Format the selected states.
    let selectedStatesList = [];
    selectedStatesParam.forEach((state) => {
      selectedStatesList.push(state.value);
    });
    let selectedStatesStr = `'${selectedStatesList.join("', '")}'`;

    // Get the count data.
    let params = {
      typeCount: typeCountParam,
      startDate: getFormattedDate(startDateParam),
      endDate: getFormattedDate(endDateParam),
      selectedStatesStr: selectedStatesStr,
    };
    getCountPerStateDate(params).then((res) => {
      console.log(res);
      displayStatesPlotData(startDateParam, selectedStatesParam, res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [displayStatesPlotData]);

  // Submit the options shown on the sidebar states tab.
  const submitStatesOptions = useCallback((optionsTabParam, typeCountParam, startDateParam, endDateParam, selectedStatesParam) => {
    setError('');
    setLoading(true);
    setOptionsTab(optionsTabParam);
    setTypeCount(typeCountParam);
    getCountStateData(typeCountParam, startDateParam, endDateParam, selectedStatesParam);
  }, [setTypeCount, getCountStateData]);

  // Construct the plot data to be displayed for the demographics tab.
  const displayDemographicsPlotData = useCallback((startDateParam, caseEthnicityQuantile) => {
    // The plot data to be saved.
    let newPlotData = [];

    // Get the list of quantiles to be included.
    let quantiles = ['Quantile 1'];

    // Add the 'Date' as the first entry for x-axis description.
    quantiles.unshift('Date');
    newPlotData.push(quantiles);

    caseEthnicityQuantile.forEach((data) => {
      let count = [];
      count.push(new Date(data.Date));
      count.push(data.CaseRate);
      newPlotData.push(count);
    });

    // Print to console for debugging.
    console.log(newPlotData);

    // Set the new plot data.
    setPlotData(newPlotData);

    // Display the plot.
    setLoading(false);
  }, [setPlotData]);

  // Get the demographics data.
  const getCaseEthnicityQuantiles = useCallback((ethnicityParam, startDateParam, endDateParam) => {
    // Get the count data.
    let params = {
      quantile: 1,
      ethnicity: ethnicityParam,
      startDate: getFormattedDate(startDateParam),
      endDate: getFormattedDate(endDateParam),
    };

    // Do a for loop and resolve all of these promises in a Promise.all.
    getCaseEthnicityQuantile(params).then((res) => {
      console.log(res);
      displayDemographicsPlotData(startDateParam, res);
    }).catch((err) => {
      setError(err.message);
    });
    setLoading(false);
  }, []);

  // Submit the options shown on the sidebar demographics tab.
  const submitDemographicsOptions = useCallback((optionsTabParam, ethnicityParam, startDateParam, endDateParam) => {
    setError('');
    setLoading(true);
    setOptionsTab(optionsTabParam);
    setEthnicity(ethnicityParam);
    getCaseEthnicityQuantiles(ethnicityParam, startDateParam, endDateParam);
  }, [setTypeCount, getCountStateData]);

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

      // Create the initial graph.
      submitStatesOptions(OptionsTab.STATES, TypeCount.CASES, firstDay, lastDay, options);
    } else {
      // Get the distinct states to be displayed.
      getDistinctStates().then((res) => {
        console.log(res);
        setDistinctStates(res);
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [distinctStates, submitStatesOptions]);

  return (
    <FlexContainer>
      <OptionsSidebar
        selectedStatesOptions={selectedStatesOptions}
        onStatesSubmit={submitStatesOptions}
        onDemographicsSubmit={submitDemographicsOptions}
      />
      <ChildFlexContainer
        flex={7}
      >
        { loading ? <LoadingChart><LoadingContainerText>Loading Chart...</LoadingContainerText></LoadingChart> : null }
        { !loading && plotData !== undefined ?
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<LoadingChart><LoadingContainerText>Loading Chart...</LoadingContainerText></LoadingChart>}
            data={plotData}
            options={{
              title: `${optionsTab === OptionsTab.STATES ? `${typeCount} by State over Time` : `Covid ${typeCount} for ${ethnicity} Quantiles`}`,
              hAxis: {
                title: 'Date',
              },
              vAxis: {
                title: `${optionsTab === OptionsTab.STATES ? `${typeCount}` : `Ratio of Covid ${typeCount} to Total U.S. Population`}`,
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

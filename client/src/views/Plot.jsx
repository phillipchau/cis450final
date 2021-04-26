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
  const displayDemographicsPlotData = useCallback((startDateParam, endDateParam, caseEthnicityQuantiles) => {
    // The plot data to be saved.
    let newPlotData = [];

    // Get the list of quantiles to be included, with 'Date' for x-axis.
    let plotAttributes = ['Date', 'Quantile 1', 'Quantile 2', 'Quantile 3', 'Quantile 4', 'Quantile 5'];
    newPlotData.push(plotAttributes);

    // Add data for all dates indicated by options.
    let currentDate = new Date(startDateParam);
    while (!sameDay(currentDate, new Date(endDateParam))) {
      let index;
      let ratios = [];
      ratios.push(new Date(currentDate));
      for (index = 0; index < 5; index++) {
        // Add the ratio for the specific quantile at that date.
        if (!caseEthnicityQuantiles[index].has(getFormattedDate(currentDate))) {
          ratios.push(0);
        } else {
          ratios.push(caseEthnicityQuantiles[index].get(getFormattedDate(currentDate)));
        }
      }
      newPlotData.push(ratios);

      // Increment the current date.
      currentDate.setDate(currentDate.getDate() + 1);
      console.log(currentDate);
    }

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
      ethnicity: ethnicityParam,
      startDate: getFormattedDate(startDateParam),
      endDate: getFormattedDate(endDateParam),
    };

    // For loop to get all the quantiles.
    let quantile;
    const promises = [];
    for (quantile = 1; quantile <= 5; quantile++) {
      params.quantile = quantile;
      promises.push(getCaseEthnicityQuantile(params));
    }
    
    console.log(startDateParam);
    console.log(new Date(startDateParam));
    // Resolve all promises and call function to display the data.
    Promise.all(promises).then((res) => {
      // Transform each array to a map with a date key and ratio value.
      const caseEthnicityQuantiles = [];
      res.forEach((quantileData) => {
        const quantileMap = new Map();
        quantileData.forEach((data) => {
          // TODO: Add ability to distinguish between cases and deaths here.
          quantileMap.set(data.Date, data.CaseRate);
        });
        caseEthnicityQuantiles.push(quantileMap);
      });

      // Print to console for debugging.
      console.log(caseEthnicityQuantiles);
      
      displayDemographicsPlotData(startDateParam, endDateParam, caseEthnicityQuantiles);
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

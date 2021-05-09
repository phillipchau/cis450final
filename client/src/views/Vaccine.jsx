import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import {
  getVaccineData,
  getVaccinatedCaseCounts, 
  getOverallVaccineData,
  getRecentCovidVaccineTweets,
} from '../api/Vaccine';
import { getDistinctStates } from '../api/StateCount';
import { VaccineOptionsSidebar, VaccineOptionsTab } from '../components/core/Options';
import getFormattedDate from '../util/Utility';
import { FlexContainer, ChildFlexContainer } from '../components/core/Container';
import { Text, LoadingContainerText } from '../components/core/Text';
import ErrorMessage from '../components/core/Error';
import { TopMarginButton } from '../components/core/Button';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TweetContainer = styled.div`
  margin: 0 auto;
  width: 325px;
`;

const TweetIndexText = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin: 1rem 0 0 0;
`;

const TweetLoadingContainer = styled.div`
  height: 200px;
  width: 325px;
  position: relative;
  border: 1px solid rgb(196, 207, 214);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  margin: 1rem 0;
`;

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
const firstDay = new Date(2021, 0, 12);
const lastDay = new Date(2021, 3, 1);

function VaccinePage() {
  // Hold error text.
  const [error, setError] = useState('');

  // Hold loading boolean.
  const [loading, setLoading] = useState(true);

  // Hold the formatted plot data to be displayed.
  const [plotData, setPlotData] = useState();

  // Hold the formatted plot data to be displayed.
  const [optionsTab, setOptionsTab] = useState(VaccineOptionsTab.STATE);

  // Hold the data retrieved by the database.
  const [distinctStates, setDistinctStates] = useState();

  // All of the states available on the plot.
  const [selectedStatesOptions, setSelectedStatesOptions] = useState([]);

  /**
   * State Tab 
   */

  // The selected state to show on the plot.
  const [selectedState, setSelectedState] = useState('');

  /**
   * Vaccine Data
   */

  const [vaccine, setVaccine] = useState([])
  const [vaccineTweetIds, setVaccineTweetIds] = useState([]);
  const [vaccineTweetIndex, setVaccineTweetIndex] = useState(0);
  useEffect(() => {
    getVaccineData().then((res) => {
      setVaccine(res);
    }).catch((err) => {
      console.log(err)
    });
    
    getRecentCovidVaccineTweets().then((res) => {
      let tweetIds = [];
      res.forEach((tweet) => {
        // Only select the English-language tweets.
        if (tweet.lang === 'en') {
          tweetIds.push(tweet.id);
        }
      })
      setVaccineTweetIds(tweetIds);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // Construct the plot data to be displayed for the state tab.
  const displayVaccineCaseData = useCallback((selectedStateParam, startDateParam, endDateParam) => {
    // The plot data to be saved.
    let newPlotData = [];

    // Print to console for debugging.
    console.log(newPlotData);

    // Set the new plot data.
    setPlotData(newPlotData);

    // Display the plot.
    setLoading(false);
  }, [setPlotData]);

  // Get the state vaccine and case data.
  const getVaccineCaseData = useCallback((selectedStateParam, startDateParam, endDateParam) => {
    // Get the vaccine and case count data.
    let params = {
      selectedState: selectedStateParam,
      startDate: getFormattedDate(startDateParam),
      endDate: getFormattedDate(endDateParam),
    };
    getVaccinatedCaseCounts(params).then((res) => {
      console.log(res);
      displayVaccineCaseData(selectedStateParam, res);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [displayVaccineCaseData]);

  // Submit the options shown on the sidebar state tab.
  const submitStateOptions = useCallback((optionsTabParam, startDateParam, endDateParam, selectedStateParam) => {
    setError('');
    setLoading(true);
    setOptionsTab(optionsTabParam);
    getVaccineCaseData(selectedStateParam, startDateParam, endDateParam);
  }, [getVaccineCaseData]);

  // Construct the plot data to be displayed for the state tab.
  const displayOverallPlotData = useCallback((selectedStatesParam, vaccineData) => {
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

    // Print to console for debugging.
    console.log(newPlotData);

    // Set the new plot data.
    setPlotData(newPlotData);

    // Display the plot.
    setLoading(false);
  }, [setPlotData]);

  // Get the overall vaccine data across the selected states.
  const getOverallVaccinations = useCallback((selectedStatesParam) => {
    // Format the selected states.
    let selectedStatesList = [];
    selectedStatesParam.forEach((state) => {
      selectedStatesList.push(state.value);
    });
    let selectedStatesStr = `'${selectedStatesList.join("', '")}'`;

    // Get the overall vaccine data.
    let params = {
      selectedStatesStr: selectedStatesStr,
    };
    getOverallVaccineData(params).then((res) => {
      console.log(res);
      displayOverallPlotData(selectedStatesParam, res);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  // Submit the options shown on the sidebar overall tab.
  const submitOverallOptions = useCallback((optionsTabParam, selectedStatesParam) => {
    setError('');
    setLoading(true);
    setOptionsTab(optionsTabParam);
    getOverallVaccinations(selectedStatesParam);
  }, [getOverallVaccineData]);

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
      setSelectedState(distinctStates[0].State);
      setSelectedStatesOptions(options);

      // Create the initial graph.
      submitStateOptions(VaccineOptionsTab.STATE, firstDay, lastDay, distinctStates[0].State);
    } else {
      // Get the distinct states to be displayed.
      getDistinctStates().then((res) => {
        console.log(res);
        setDistinctStates(res);
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [distinctStates, submitStateOptions]);

  return (
    <>
      <FlexContainer>
        <VaccineOptionsSidebar
          selectedStatesOptions={selectedStatesOptions}
          distinctStates={distinctStates}
          selectedState={selectedState}
          onStateSubmit={submitStateOptions}
          onOverallSubmit={submitOverallOptions}
        />
        <ChildFlexContainer
          flex={7}
        >
          { loading ? <LoadingChart><LoadingContainerText>Loading Chart...</LoadingContainerText></LoadingChart> : null }
          { !loading && plotData !== undefined ?
            <Chart
              width={'600px'}
              height={'400px'}
              chartType={`${optionsTab === VaccineOptionsTab.STATE ? 'LineChart' : 'ColumnChart'}`}
              loader={<LoadingChart><LoadingContainerText>Loading Chart...</LoadingContainerText></LoadingChart>}
              data={plotData}
              options={{
                title: `${optionsTab === VaccineOptionsTab.STATE ? `Vaccines and Cases for ${selectedState}` : 'Total Vaccination Count'}`,
                hAxis: {
                  title: `${optionsTab === VaccineOptionsTab.STATE ? 'Date' : 'States'}`,
                },
                vAxis: {
                  title: `${optionsTab === VaccineOptionsTab.STATE ? `Number of Vaccines Given or Cases Tracked for ${selectedState}` : 'Number of Vaccines Given'}`,
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
      <br></br>
      { vaccineTweetIds !== undefined ?
        <TweetContainer>
          <h4>COVID Vaccines: Twitter</h4>
          <FlexContainer>
            <TopMarginButton
              onClick={() => {
                setVaccineTweetIndex(vaccineTweetIndex - 1);
              }}
              disabled={vaccineTweetIndex < 1}
            >
              Prev
            </TopMarginButton>
            <TweetIndexText>{vaccineTweetIndex + 1}/{vaccineTweetIds.length}</TweetIndexText>
            <TopMarginButton
              onClick={() => {
                setVaccineTweetIndex(vaccineTweetIndex + 1);
              }}
              disabled={vaccineTweetIndex >= vaccineTweetIds.length - 1}
            >
              Next
            </TopMarginButton>
          </FlexContainer>
          <TwitterTweetEmbed
            key={vaccineTweetIds[vaccineTweetIndex] || 0}
            tweetId={vaccineTweetIds[vaccineTweetIndex] || 0}
            placeholder={<TweetLoadingContainer><LoadingContainerText>Loading...</LoadingContainerText></TweetLoadingContainer>}
            options={{ width: 325, conversation: 'none', cards: 'hidden', align: 'center' }}
          />
        </TweetContainer> : null
      }
    </>
  );
}

export default VaccinePage;
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getCountPerStateDate, getDistinctStates, TypeCount } from '../api/StateCount';
import ErrorMessage from '../components/core/Error';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

// Helper function to determine if two dates are the same.
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

// Get the formatted date to display as the value.
function getFormattedDate(date) {
  if (date === undefined) {
    return date;
  }

  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return year + '-' + month + '-' + day;
}

const CustomChart = styled(Chart)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 1rem 0;
`;

const LoadingChart = styled.div`
  background: white;
  position: relative;
  width: 600px;
  height: 400px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 1rem 0;
`;

const LoadingChartText = styled(LandingHeaderText)`
  vertical-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
    };
    getCountPerStateDate(params).then((res) => {
      console.log(res);
      setCountPerStateDate(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [typeCount]);

  // Set the starting and ending dates.
  useEffect(() => {
    // First day in the COVID history.
    setStartDate(new Date(2020, 0, 20));

    // This is the most recent date we have available in our database.
    setEndDate(new Date(2021, 3, 1));
  }, [setStartDate, setEndDate]);

  // Update the data retrieved from the database.
  useEffect(() => {
    // Update the plot data to display the correct dates.
    console.log('The dates were changed!');
  }, [startDate, endDate]);

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
    <div>
      <LandingHeaderText>
        This is the Plot page.
      </LandingHeaderText>
      <h5>Date Range</h5>

      <label htmlFor="start-date-input">Start</label>
      <input type="date" value={getFormattedDate(startDate)} id="start-date-input" onChange={(e) => {
        let newDate = new Date(e.target.value);
        newDate.setDate(newDate.getDate() + 1);
        setStartDate(newDate);
      }} />

      <label htmlFor="end-date-input" >End</label>
      <input type="date" value={getFormattedDate(endDate)} id="end-date-input" onChange={(e) => {
        let newDate = new Date(e.target.value);
        newDate.setDate(newDate.getDate() + 1);
        setEndDate(newDate);
      }} />
      <label>
        Count Cases
        <input
          name="Count Cases"
          type="checkbox"
          checked={typeCount === TypeCount.CASES}
          onChange={() => setTypeCount(TypeCount.CASES)}
        />
      </label>
      <label>
        Count Deaths
        <input
          name="Count Deaths"
          type="checkbox"
          checked={typeCount === TypeCount.DEATHS}
          onChange={() => setTypeCount(TypeCount.DEATHS)}
        />
      </label>
      { loading ? <LoadingChart><LoadingChartText>Loading Chart...</LoadingChartText></LoadingChart> : null }
      { error ? <ErrorMessage message={error} /> : null }
      {plotData !== undefined ?
        <CustomChart
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
      <TextBlockLink to="/">Return to homepage.</TextBlockLink>
    </div>
  );
}

export default PlotPage;

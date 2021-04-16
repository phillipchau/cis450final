import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import getStatesCasesMap from '../api/States';
import ErrorMessage from '../components/core/Error';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function PlotPage() {

  // Hold the cases data, where each state connects list of cases and dates.
  const [statesCasesMap, setStatesCasesMap] = useState();

  // Hold the formatted plot data to be displayed.
  const [plotData, setPlotData] = useState();

  // Hold the starting and ending dates.
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // Hold error text.
  const [error, setError] = useState('');

  // Get the states data.
  useEffect(() => {
    setError('');
    getStatesCasesMap().then((res) => {
      setStatesCasesMap(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [setStates]);

  // Get the states data.
  useEffect(() => {
    // First day of 2021 (furthest date we have is 1/21/2021).
    setStartDate(new Date(2021, 0, 1));

    // This is the most recent date we have available in our database.
    setEndDate(new Date(2021, 3, 1));
  }, [setStartDate, setEndDate]);

  // Update the data retrieved from the database.
  useEffect(() => {
    // Update the plot data to display the correct dates.
    console.log('The dates were changed!');
  }, [startDate, endDate]);

  return (
    <div>
      <LandingHeaderText>
        This is the Plot page.
      </LandingHeaderText>
      { error ? <ErrorMessage message={error} /> : null }
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          Object.keys(statesCasesMap),
          [0, 0, 0, 0],
          [1, 10, 5, 10],
          [2, 23, 15,6],
          [3, 17, 9, 19],
          [4, 18, 10, 1],
          [5, 9, 5, 1],
          [6, 11, 3, 1],
          [7, 27, 19, 1],
        ]}
        options={{
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Cases',
          },
          series: {
            1: { curveType: 'function' },
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
      <TextBlockLink to="/">Return to homepage.</TextBlockLink>
    </div>
  );
}

export default PlotPage;

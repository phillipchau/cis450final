import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import getStates from '../api/States';
import ErrorMessage from '../components/core/Error';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function PlotPage() {

  // Hold the vaccine data.
  const [states, setStates] = useState();

  // Hold the vaccine data.
  const [startDate, setEndDate] = useState();

  // Hold error text.
  const [error, setError] = useState('');

  // Get the vaccine data.
  useEffect(() => {
    setError('');
    getStates().then((res) => {
      setStates(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [setStates]);

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
          states,
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

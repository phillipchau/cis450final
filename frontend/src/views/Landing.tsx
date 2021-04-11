import React, { useEffect, useState } from 'react';
import { getVaccineData } from '../api/Vaccine';
import ErrorMessage from '../components/core/Error';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function LandingPage() {

  // Hold error text.
  const [error, setError] = useState('');

  useEffect(() => {
    getVaccineData().then((res) => {
      console.log(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, []);

  return (
    <>
      <LandingHeaderText>
        Welcome to the CIS 450 Final Project from Group 36!
      </LandingHeaderText>
      <TextBlockLink to="/map">Map</TextBlockLink>
      <TextBlockLink to="/plot">Plot</TextBlockLink>
      <p>
        { error ? <ErrorMessage message={error} /> : null }
      </p>
    </>
  );
}

export default LandingPage;

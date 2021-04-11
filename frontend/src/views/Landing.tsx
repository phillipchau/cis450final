import React, { useEffect, useState } from 'react';
import { getVaccineData, Vaccine } from '../api/Vaccine';
import ErrorMessage from '../components/core/Error';
import { LandingHeaderText } from '../components/core/Text';

function LandingPage() {

  // Hold the vaccine data.
  const [vaccineData, setVaccineData] = useState<Vaccine[] | undefined>();

  // Hold error text.
  const [error, setError] = useState('');

  // Get the vaccine data.
  useEffect(() => {
    getVaccineData().then((res) => {
      setVaccineData(res);
    }).catch((err) => {
      setError(err.message);
    });
  }, [setVaccineData]);

  return (
    <>
      <LandingHeaderText>
        Welcome to the CIS 450 Final Project from Group 36!
      </LandingHeaderText>
      { error ? <ErrorMessage message={error} /> : null }
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>State</th>
            <th>Vaccinated</th>
          </tr>
          {vaccineData === undefined ?
            (
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            )
            :
            vaccineData.map((vaccine, index) => (
              <tr key={index}>
                <td>{vaccine.Date}</td>
                <td>{vaccine.State}</td>
                <td>{vaccine.Vaccinated}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default LandingPage;

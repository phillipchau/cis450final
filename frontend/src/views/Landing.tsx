import React, { useEffect, useState } from 'react';
import { getVaccineData, Vaccine } from '../api/Vaccine';
import ErrorMessage from '../components/core/Error';
import { LandingHeaderText } from '../components/core/Text';
import {
  TableElement,
  TableHead,
  TableBody,
  TableRowElement,
  TableHeadElement,
  TableDataElement,
} from '../components/core/Table';

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
      <TableElement>
        <TableHead>
          <TableRowElement>
            <TableHeadElement>Date</TableHeadElement>
            <TableHeadElement>State</TableHeadElement>
            <TableHeadElement>Vaccinated</TableHeadElement>
          </TableRowElement>
        </TableHead>
        <TableBody>
          {vaccineData === undefined ?
            (
              <TableRowElement>
                <TableDataElement>Loading...</TableDataElement>
                <TableDataElement>Loading...</TableDataElement>
                <TableDataElement>Loading...</TableDataElement>
              </TableRowElement>
            )
            :
            vaccineData.map((vaccine, index) => (
              <TableRowElement key={index}>
                <TableDataElement>{vaccine.Date}</TableDataElement>
                <TableDataElement>{vaccine.State}</TableDataElement>
                <TableDataElement>{vaccine.Vaccinated}</TableDataElement>
              </TableRowElement>
            ))
          }
        </TableBody>
      </TableElement>
    </>
  );
}

export default LandingPage;

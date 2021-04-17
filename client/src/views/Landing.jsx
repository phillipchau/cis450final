import React, { useEffect, useState } from 'react';
import { getVaccineData } from '../api/Vaccine';
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
import { getLatestCovidArticles } from '../api/NYTData';

function LandingPage() {

  // Hold the vaccine data.
  const [vaccineData, setVaccineData] = useState();

  // The latest articles from NYT.
  const [latestArticles, setLatestArticles] = useState();

  // Hold loading boolean.
  const [loading, setLoading] = useState(false);
  
  // Hold error text.
  const [error, setError] = useState('');

  // Get the vaccine data.
  useEffect(() => {
    setLoading(true);
    getVaccineData().then((res) => {
      setVaccineData(res);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [setVaccineData]);

  useEffect(() => {
    setLoading(true);
    getLatestCovidArticles().then((res) => {
      console.log(res);
      setLatestArticles(res);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [setLatestArticles]);

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
              loading ? (
                <TableRowElement>
                  <TableDataElement>Loading...</TableDataElement>
                  <TableDataElement>Loading...</TableDataElement>
                  <TableDataElement>Loading...</TableDataElement>
                </TableRowElement>
              ) : null
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

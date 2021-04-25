import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getVaccineData, getRecentCovidVaccineTweets } from '../api/Vaccine';
import { FlexContainer, ChildFlexContainer } from '../components/core/Container';
import ErrorMessage from '../components/core/Error';
import { Text, LandingHeaderText } from '../components/core/Text';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const geodata = require('../api/us-states')

console.log(geodata)

function getColor(d) {
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function ChangeView() {
  const map = useMap()
  map.setView([37.8, -96], 4)
  L.geoJSON(geodata).addTo(map);
  L.geoJson(geodata, {style: style}).addTo(map);
  return null
}

function VaccinePage() {
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

    return (
      <>
        { vaccineTweetIds !== undefined ?
          <>
            <h5>COVID Vaccines on Twitter</h5>
            <TwitterTweetEmbed
              key={vaccineTweetIds[vaccineTweetIndex]}
              tweetId={vaccineTweetIds[vaccineTweetIndex]}
              options={{ hide_thread: true }}
            />
            <div>
              <Text
                onClick={() => setVaccineTweetIndex(vaccineTweetIndex - 1)}
              >Previous</Text>
              <Text
                onClick={() => setVaccineTweetIndex(vaccineTweetIndex + 1)}
              >Next</Text>
            </div>
          </> : null
        }
        <MapContainer
          style={{ height: '100vh', width: '100%' }}
        >
          <ChangeView  /> 
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
             id='mapbox/light-v9'
          />
        </MapContainer>
      </>
    )
}

export default VaccinePage;
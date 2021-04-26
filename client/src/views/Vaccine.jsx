import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { getVaccineData, getRecentCovidVaccineTweets } from '../api/Vaccine';
import { FlexContainer } from '../components/core/Container';
import { Text, LoadingContainerText } from '../components/core/Text';
import ErrorMessage from '../components/core/Error';
import { TopMarginButton } from '../components/core/Button';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const geodata = require('../api/us-states');

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
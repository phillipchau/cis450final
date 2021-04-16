import React, { useEffect, useState } from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import { getIncomeDataQ1, getIncomeDataQ2, getIncomeDataQ3, getIncomeDataQ4 } from '../api/Income';
import {MapContainer, CircleMarker, TileLayer, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPage({statefilter, modefilter}) {
  //sets income data for various quarters if the income option is toggled
  const [incomeDataQ1, setIncomeDataQ1] = useState([])
  const [incomeDataQ2, setIncomeDataQ2] = useState([])
  const [incomeDataQ3, setIncomeDataQ3] = useState([])
  const [incomeDataQ4, setIncomeDataQ4] = useState([])

  const[filterstate, setFilterState] = useState(statefilter)
  const[filtermode, setFilterMode] = useState(modefilter)
  const defaultPosition = [37.0902, -100]; // center of US position

  useEffect(() => {
    getIncomeDataQ1().then((res) => {
      setIncomeDataQ1(res);
      }).catch((err) => {
        console.log(err)
      });

    getIncomeDataQ2().then((res) => {
      setIncomeDataQ2(res);
      }).catch((err) => {
        console.log(err)
      });

    getIncomeDataQ3().then((res) => {
      setIncomeDataQ3(res);
      }).catch((err) => {
        console.log(err)
      });

    getIncomeDataQ4().then((res) => {
      setIncomeDataQ4(res);
      }).catch((err) => {
        console.log(err)
      });
  }, []);

  console.log('changing filter')
  return(
    <>
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={4.49}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {incomeDataQ1.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={5000 * city["DeathsRate"]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='blue'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Population" + " " + city["DeathsRate"]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        {incomeDataQ2.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={5000 * city["DeathsRate"]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='red'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Population" + " " + city["DeathsRate"]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
          {incomeDataQ3.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={5000 * city["DeathsRate"]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='green'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Population" + " " + city["DeathsRate"]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
          {incomeDataQ4.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={5000 * city["DeathsRate"]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='black'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Population" + " " + city["DeathsRate"]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
      </MapContainer>
    </div>
    </>
  );
}

export default MapPage;

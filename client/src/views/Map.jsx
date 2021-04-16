import React, { useEffect, useState } from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import { getIncomeDataQ1, getIncomeDataQ2, getIncomeDataQ3, getIncomeDataQ4 } from '../api/Income';
import { getPovertyQ1, getPovertyQ2, getPovertyQ3, getPovertyQ4, getTotalCovid, getStateCoords } from '../api/MapData';
import {MapContainer, CircleMarker, TileLayer, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPage({statefilter, modefilter}) {
  //sets income data for various quarters if the income option is toggled
  const [groupDataQ1, setGroupDataQ1] = useState([])
  const [groupDataQ2, setGroupDataQ2] = useState([])
  const [groupDataQ3, setGroupDataQ3] = useState([])
  const [groupDataQ4, setGroupDataQ4] = useState([])

  //state variables to track change of state from form submission
  const[filterstate, setFilterState] = useState('')
  const[filtermode, setFilterMode] = useState('')

  const defaultPosition = [37.0902, -100]; // center of US position
  const defaultZoom = 5
  const defaultRadius = 5000

  //changes map parameters based on if a certain state is chosen
  const[zoom, setZoom] = useState(defaultZoom)
  const [center, setCenter] = useState(defaultPosition)
  const [radius, setRadius] = useState(defaultRadius)


  if (modefilter !== filtermode) {
    setFilterMode(modefilter)
  }

  if (filterstate !== statefilter) {
    setFilterState(statefilter)
  }
  //if we specify a state, change map parameters
  useEffect(() => {
    if (filterstate !== '') {
      getStateCoords(filterstate).then((res) => {
        const newCoor = []
        console.log(res)
        newCoor.push(res[0].Lat)
        newCoor.push(res[0].Lon)
        console.log(newCoor)
        setCenter(newCoor)
      })
    }
  }, [filterstate])
  
  useEffect(() => {
    if (filtermode === 'income') {
      getIncomeDataQ1().then((res) => {
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ2().then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ3().then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ4().then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
        });
    } else if (filtermode === 'poverty') {
      getPovertyQ1().then((res) => {
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ2().then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ3().then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ4().then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
      });
    }
    else {
      setGroupDataQ1([])
      setGroupDataQ2([])
      setGroupDataQ3([])
      setGroupDataQ4([])
    }
  }, [filtermode]);

  return(
    <>
    <div className="map__container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {groupDataQ1.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={radius * city["DeathsRate"]}
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
        {groupDataQ2.map((city, k) => {
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
          {groupDataQ3.map((city, k) => {
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
          {groupDataQ4.map((city, k) => {
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

import React, { useEffect, useState } from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import { getIncomeDataQ1, getIncomeDataQ2, getIncomeDataQ3, getIncomeDataQ4 } from '../api/Income';
import { getPovertyQ1, getPovertyQ2, getPovertyQ3, getPovertyQ4, getTotalCovid, getTotalCovidState, getStateCoords } from '../api/MapData';
import {MapContainer, CircleMarker, TileLayer, Tooltip, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeView({center, zoom}) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

function MapPage({statefilter, modefilter}) {
  //sets income data for various quarters if the income option is toggled
  const [groupDataQ1, setGroupDataQ1] = useState([])
  const [groupDataQ2, setGroupDataQ2] = useState([])
  const [groupDataQ3, setGroupDataQ3] = useState([])
  const [groupDataQ4, setGroupDataQ4] = useState([])

  //state variables to track change of state from form submission
  const[filterstate, setFilterState] = useState('')
  //tracks the filter we are applying
  const[filtermode, setFilterMode] = useState('')

  const defaultPosition = [37.0902, -100]; // center of US position
  const defaultZoom = 5
  const defaultRadius = 5000

  //changes map parameters based on if a certain state is chosen
  const[zoom, setZoom] = useState(defaultZoom)
  const [center, setCenter] = useState(defaultPosition)
  const [radius, setRadius] = useState(defaultRadius)
  const [metric, setMetric] = useState('')

  //updates the filter if changed from the form
  if (modefilter !== filtermode) {
    setFilterMode(modefilter)
  }

  if (filterstate !== statefilter) {
    console.log(statefilter)
    setFilterState(statefilter)
  }
  //if we specify a state, change map parameters
  useEffect(() => {
    if (filterstate !== 'none') {
      getStateCoords(filterstate).then((res) => {
        const newCoor = []
        newCoor.push(res[0].Lat)
        newCoor.push(res[0].Lon)
        setZoom(6.3)
        setCenter(newCoor)
        setRadius(10000)
      })
    }
    else {
      setZoom(defaultZoom)
      setCenter(defaultPosition)
    }
  }, [filterstate])
  
  useEffect(() => {
    if (filtermode === 'income') {
      setMetric('DeathsRate')
      setRadius(defaultRadius)
      getIncomeDataQ1(filterstate).then((res) => {
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ2(filterstate).then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ3(filterstate).then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ4(filterstate).then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
        });
    } else if (filtermode === 'poverty') {
      setMetric('DeathsRate')
      setRadius(defaultRadius)
      console.log(filterstate)
      getPovertyQ1(filterstate).then((res) => {
        console.log(res)
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ2(filterstate).then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ3(filterstate).then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ4(filterstate).then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
      });
    }
    else if (filtermode === 'total') {
      //change radius to account for total
      setMetric('sum_deaths')
      setRadius(0.00006)
      getTotalCovidState().then((res) => {
        console.log(res)
        setGroupDataQ1(res);
        //setGroupDataQ1([]);
        setGroupDataQ2([])
        setGroupDataQ3([])
        setGroupDataQ4([])
      }).catch((err) => {
        console.log(err)
      })
        
    }
    else {
      setGroupDataQ1([])
      setGroupDataQ2([])
      setGroupDataQ3([])
      setGroupDataQ4([])
    }
  }, [filtermode, filterstate]);

  return(
    <>
    <div className="map__container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100%' }}
      >
        <ChangeView center={center} zoom={zoom} /> 
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {groupDataQ1.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={radius * city[metric]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='blue'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Deaths" + " " + city[metric]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        {groupDataQ2.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={radius * city[metric]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='red'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Deaths" + " " + city[metric]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
          {groupDataQ3.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={radius * city[metric]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='green'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Deaths" + " " + city[metric]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
          {groupDataQ4.map((city, k) => {
            return (
              <CircleMarker
                key={k}
                center={[city["Lat"], city["Lon"]]}
                radius={radius * city[metric]}
                fillOpacity={0.6}
                stroke={false}
                fillColor='black'
              >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["County"] + ": " + "Deaths" + " " + city[metric]}</span>
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

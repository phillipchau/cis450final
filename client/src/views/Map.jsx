import React, { useEffect, useState } from 'react';
import { getUser, getLogin } from '../api/Home';
import { getIncomeDataQ1, getIncomeDataQ2, getIncomeDataQ3, getIncomeDataQ4 } from '../api/Income';
import { getPovertyQ1, getPovertyQ2, getPovertyQ3, getPovertyQ4, 
  getTotalCovidState, getStateCoords, getMaskQ1, getMaskQ2, getMaskQ3, getMaskQ4 } from '../api/MapData';
import {MapContainer, CircleMarker, TileLayer, Tooltip, useMap} from 'react-leaflet';
import ErrorMessage from '../components/core/Error';
import 'leaflet/dist/leaflet.css';

function ChangeView({center, zoom}) {
  const map = useMap()
  map.setView(center, zoom)
 
  return null
}

function MapPage({statefilter, modefilter, date, modemetric}) {
  //sets income data for various quarters if the income option is toggled
  const [groupDataQ1, setGroupDataQ1] = useState([])
  const [groupDataQ2, setGroupDataQ2] = useState([])
  const [groupDataQ3, setGroupDataQ3] = useState([])
  const [groupDataQ4, setGroupDataQ4] = useState([])

  //state variables to track change of state from form submission
  const[filterstate, setFilterState] = useState('none')
  //tracks the filter we are applying
  const[filtermode, setFilterMode] = useState('')
  const [startdate, setStartDate] = useState(date)

  //tracks the metric filter we are applying 
  const [filtermetric, setFilterMetric] = useState('deaths')

  const defaultPosition = [37.0902, -100]; // center of US position
  const defaultZoom = 5
  const defaultRadius = 7000

  //changes map parameters based on if a certain state is chosen
  const[zoom, setZoom] = useState(defaultZoom)
  const [center, setCenter] = useState(defaultPosition)
  const [radius, setRadius] = useState(defaultRadius)
  const [error, setError] = useState('');
  const [metric, setMetric] = useState('')

  //updates the filter if changed from the form
  if (modefilter !== filtermode) {
    setFilterMode(modefilter)
  }

  if (filterstate !== statefilter) {
    setFilterState(statefilter)
  }

  if (startdate !== date) {
    setStartDate(date)
  }

  if (filtermetric !== modemetric) {
    console.log(modemetric)
    setFilterMetric(modemetric)
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
        if (filtermetric === 'deaths') {
          console.log(filtermetric)
          setRadius(20000)
        } else {
          setRadius(1000)
        }
      })
    }
    else {
      setZoom(defaultZoom)
      setCenter(defaultPosition)
    }
  }, [filterstate])
  
  useEffect(() => {
    if (filtermode === 'income') {
      if (filtermetric === 'deaths') {
        console.log(radius)
        setMetric('DeathsRate')
        setRadius(defaultRadius)
      } else {
        setMetric('CasesRate')
        setRadius(300)
      }
      console.log(radius)
      getIncomeDataQ1(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ2(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ3(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
        });
  
      getIncomeDataQ4(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
        });
    } else if (filtermode === 'poverty') {
      if (filtermetric === 'deaths') {
        setMetric('DeathsRate')
        setRadius(defaultRadius)
      } else {
        setMetric('CasesRate')
        setRadius(500)
      }
      console.log(filterstate)
      getPovertyQ1(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        console.log(res)
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ2(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ3(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
      });

      getPovertyQ4(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        setGroupDataQ4(res);
        }).catch((err) => {
          console.log(err)
      });
    }
    else if (filtermode === 'total') {
      //change radius to account for total
      if (filtermetric === 'deaths') {
        setMetric('sum_deaths')
      } else {
        setMetric('sum_cases')
      }
      setRadius(0.00006)
      getTotalCovidState().then((res) => {
        console.log(res)
        setGroupDataQ1(res);
        setGroupDataQ2([])
        setGroupDataQ3([])
        setGroupDataQ4([])
      }).catch((err) => {
        console.log(err)
      })
        
    }
    else if (filtermode === 'mask') {
      if (filtermetric === 'deaths') {
        setMetric('DeathsRate')
        setRadius(50)
      } else {
        setMetric('CasesRate')
        setRadius(50)
      }
      getMaskQ1(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        console.log(res)
        setGroupDataQ1(res);
        }).catch((err) => {
          console.log(err)
      });
      getMaskQ2(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        console.log(res)
        setGroupDataQ2(res);
        }).catch((err) => {
          console.log(err)
      });
      getMaskQ3(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        console.log(res)
        setGroupDataQ3(res);
        }).catch((err) => {
          console.log(err)
      });
      getMaskQ4(filterstate, startdate.toISOString().substring(0, 10)).then((res) => {
        console.log(res)
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
  }, [filtermode, filterstate, startdate, filtermetric]);

  return(
    <>
    <div className="map__container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100vh', width: '100%' }}
      >
        {filterstate !== 'none' && (<ChangeView center={center} zoom={zoom} /> )}
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
                  <span>{city["County"] + ": " + metric + " " + city[metric]}</span>
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
                  <span>{city["County"] + ": " + metric + " " + city[metric]}</span>
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
                  <span>{city["County"] + ": " + metric + " " + city[metric]}</span>
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
                  <span>{city["County"] + ": " + metric + " " + city[metric]}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
      </MapContainer>
    </div>
    { error ? <ErrorMessage message={error} /> : null }
    </>
  );
}

export default MapPage;

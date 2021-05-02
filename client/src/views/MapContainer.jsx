import React, { useEffect, useState } from 'react';
import { getUser, getLogin } from '../api/Home';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import Options from './Options'
import Map from './Map'
import Legend from './Legend'
import ErrorMessage from '../components/core/Error';

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function MapContainer() {
  //define the states of the filters
  const [stateFilter, setStateFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')
  const [startdate, setStartDate] = useState(lastDay)
  const [modeMetric, setModeMetric] = useState('')
  const [error, setError] = useState('');
  const [userState, setUserState] = useState('Alabama')

  useEffect(() => {
    getLogin().then((res) => {
      console.log(res)
      if (!res) {
        //history.push('/login')
      } else {
        getUser(res).then((response) => {
          setStateFilter(response.state)
          setModeFilter('income')
          setUserState(response.state)
          console.log(response.state)
        }).catch((error) => {
          setError(error.message)
        });
      }
    }).catch((err) => {
      setError(err.message);
    });
  }, [])

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs" >
          <Options userState={userState} statefilter={setStateFilter} modefilter={setModeFilter} setStart={setStartDate} modemetric={setModeMetric}/>
        </div>
        <div class="col-xl">
          <Map statefilter={stateFilter} modefilter={modeFilter} date={startdate} modemetric={modeMetric}/>
          <Legend />
        </div> 
      </div>
    </div>
  );
}

export default MapContainer;
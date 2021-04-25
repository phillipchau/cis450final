import React, {useState} from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import Options from './Options'
import Map from './Map'
import Legend from './Legend'

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);

function MapContainer() {
  //define the states of the filters
  const [stateFilter, setStateFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')
  const [startdate, setStartDate] = useState(firstDay)
  const [modeMetric, setModeMetric] = useState('')

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs" >
          <Options statefilter={setStateFilter} modefilter={setModeFilter} setStart={setStartDate} modemetric={setModeMetric}/>
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
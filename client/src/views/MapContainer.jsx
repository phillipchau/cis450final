import React, {useState} from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';
import Options from './Options'
import Map from './Map'

function MapContainer() {
  //define the states of the filters
  const [stateFilter, setStateFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs" >
          <Options statefilter={setStateFilter} modefilter={setModeFilter}/>
        </div>
        <div class="col-xl">
          <Map statefilter={stateFilter} modefilter={modeFilter}/>
        </div> 
      </div>
    </div>
  );
}

export default MapContainer;
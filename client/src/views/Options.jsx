import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getStates, getCounties } from '../api/MapData';

const Bar = styled.div`
height: 100%;
text-align: left;
padding:20px;
border: 3px solid black;
`;

function Options({statefilter, modefilter}) {
    const [states, setStates] = useState([])
    const [currState, setCurrState] = useState('Alabama')
    const [mode, setMode] = useState('')
    const [popmode, setPopMode] = useState('country')

    useEffect(() => {
      getStates().then((res) => {
        setStates(res);
        setCurrState(res[0].State)
      }).catch((err) => {
        console.log(err)
      });
    }, [])

  const submitForm = () => {
    if (popmode !== "state") {
      statefilter('none')
    }
    else {
      statefilter(currState)
    }
    modefilter(mode)
  }

  console.log(popmode)
  return (
    <>
      <Bar id="options">
        <form onSubmit={e => {
          e.preventDefault()
          submitForm()
          setCurrState('Alabama')
          setMode(mode)
        }}
        >
        <h5>Date Range</h5>
        <div class="form-group row">
          <label for="start-date-input" class="col-2 col-form-label">Start</label>
          <div class="col-8">
            <input class="form-control" type="date" value="2011-08-19" id="start-date-input" />
          </div>
        </div>

        <div class="form-group row">
          <label for="end-date-input" class="col-2 col-form-label">End</label>
          <div class="col-8">
            <input class="form-control" type="date" value="2011-08-19" id="end-date-input" />
          </div>
        </div>

        <h5>Population Level</h5>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="filterPop" value="country" id="defaultcheckpop" checked={popmode === "country"} onChange={e => setPopMode(e.target.value)}/>
            <label class="form-check-label" for="defaultcheck" style={{marginRight:50}}>
                Country View
            </label>
            <input class="form-check-input" type="radio" name="filterPop" value="state" id="defaultcheckpopstate" checked={popmode === "state"} onChange={e => setPopMode(e.target.value)}/>
            <label class="form-check-label" for="defaultcheckpopstate">
                State View
            </label>
        </div>
        <p style={{marginBottom: 0}}> State</p>
        <select class="form-select" aria-label="State Selector" value={currState} onChange={e => setCurrState(e.target.value)} disabled={popmode !== "state"}>
          {states.map((state, k) => {
            return (
              <>
              <option key={k} value={state.State}>{state.State}</option>
              </>
            )})}
        </select>

        <h5 style={{marginTop:20}}>Filters</h5>
        <div id="radiogroup">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="filter" value="total" id="defaultcheck" checked={mode === "total"} onChange={e => setMode(e.target.value)}/>
            <label class="form-check-label" for="defaultcheck">
                Total
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" value="income" name="filter" id="incomecheck"  checked={mode === 'income'} onChange={e => setMode(e.target.value)}/>
            <label class="form-check-label" for="incomecheck">
                Income
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" value="poverty" name="filter" id="povertycheck"  checked={mode === 'poverty'} onChange={e => setMode(e.target.value)} />
            <label class="form-check-label" for="povertycheck">
                Poverty
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" value="race" name="filter" id="racecheck"  checked={mode === 'race'} onChange={e => setMode(e.target.value)} />
            <label class="form-check-label" for="racecheck">
                Race
            </label>
        </div>
        </div>
        <button style={{ marginTop: 40 }} type="submit" className="btn btn-primary btn-lg btn-block">Submit Filters</button>
      </form>
    </Bar>
    </>
  );
}

export default Options;
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getStates } from '../api/MapData';
import getFormattedDate from '../util/Utility';
import ErrorMessage from '../components/core/Error';

const Bar = styled.div`
height: 100%;
text-align: left;
padding:20px;
border: 3px solid black;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.25rem 0;
`;

const Input = styled.input`
  display: block;
`;

// These are the dates available in the COVID database.
const firstDay = new Date(2020, 0, 20);
const lastDay = new Date(2021, 3, 1);

function Options({statefilter, modefilter, setStart, modemetric, userState}) {
    const [states, setStates] = useState([])
    const [currState, setCurrState] = useState(userState)
    //determines the state of the filter that can be applied
    const [mode, setMode] = useState('income')
    //determines the population level mode
    const [popmode, setPopMode] = useState('state')
    // Hold the starting and ending dates.
    const [startDate, setStartDate] = useState(lastDay);
    // Hold error text.
    const [error, setError] = useState('');


    //determines the metric 
    const [metric, setMetric] = useState('deaths')

    useEffect(() => {
      getStates().then((res) => {
        setStates(res);
        //setCurrState(res[0].State)
      }).catch((err) => {
        console.log(err)
      });
    }, [])

    useEffect(() => {
      setCurrState(userState)
    }, [userState])

  const submitForm = () => {
    if (popmode !== "state") {
      statefilter('none')
    }
    else {
      statefilter(currState)
    }
    modefilter(mode)
    setStart(startDate)
    modemetric(metric)
  }
  console.log(userState)

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
         <h5>Date Selector</h5>

        <Label htmlFor="start-date-input">Current Date</Label>
        <Input disabled={mode == 'mask' || mode == 'total'} type="date" value={getFormattedDate(startDate)} id="start-date-input" onChange={(e) => {
          setError('');
          let newDate = new Date(e.target.value);
          newDate.setDate(newDate.getDate() + 1);
          if (newDate >= firstDay && newDate <= lastDay) {
            setStartDate(newDate);
          } else {
            setError('The date must have data in the database and be before the ending date.');
          }
        }} />
        <h5 style={{marginTop: 20}}>Metric</h5>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="metric" value="cases" id="defaultmetriccases" checked={metric === "cases"} onChange={e => setMetric(e.target.value)}/>
            <label class="form-check-label" for="defaultmetriccases" style={{marginRight:50}}>
                Cases
            </label>
            <input class="form-check-input" type="radio" name="metric" value="deaths" id="defaultmetricdeaths" checked={metric === "deaths"} onChange={e => setMetric(e.target.value)}/>
            <label class="form-check-label" for="defaultmetricdeaths">
                Deaths
            </label>
        </div>
        <h5 style={{marginTop: 20}}>Population Level</h5>
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
            <input class="form-check-input" type="radio" value="mask" name="filter" id="maskcheck"  checked={mode === 'mask'} onChange={e => setMode(e.target.value)} />
            <label class="form-check-label" for="maskcheck">
                Mask Usage
            </label>
        </div>
        </div>
        <button style={{ marginTop: 40 }} type="submit" className="btn btn-primary btn-lg btn-block">Submit Filters</button>
      </form>
      { error ? <ErrorMessage message={error} /> : null }
    </Bar>
    </>
  );
}

export default Options;
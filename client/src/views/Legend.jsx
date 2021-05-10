import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getBoundQ1, getBoundQ2, getBoundQ3, getBoundQ4} from '../api/MapData';

const LegendContainer = styled.div`
height: 10%;
width:100%;
text-align: left;
padding:20px;
margin-top: 10px;
margin-bottom:10px;


border: 3px solid black;
`;

const RedCircle = styled.div`
border-radius:50%;
height:20px;
width:20px;
background:red;
`

const GreenCircle = styled.div`
border-radius:50%;
height:20px;
width:20px;
background:green;
`

const BlueCircle = styled.div`
border-radius:50%;
height:20px;
width:20px;
background:blue;
`

const BlackCircle = styled.div`
border-radius:50%;
height:20px;
width:20px;
background:black;
`


function Legend({mode}) {
  const [q1, SetQ1] = useState('')
  const [q2, SetQ2] = useState('')
  const [q3, SetQ3] = useState('')
  const [q4, SetQ4] = useState('')

  const [currmode, SetCurrMode] = useState('')

  if (mode !== currmode) {
    SetCurrMode(mode)
  }
  console.log(mode)
  useEffect(() => {
    if (mode === 'income' || mode === 'poverty' || mode == 'mask') {
      getBoundQ1(mode).then((res) => {
        SetQ1(res[0]);
      }).catch((err) => {
        console.log(err)
      });

      getBoundQ2(mode).then((res) => {
        console.log(res)
        SetQ2(res[0]);
      }).catch((err) => {
        console.log(err)
      });

      getBoundQ3(mode).then((res) => {
        SetQ3(res[0]);
      }).catch((err) => {
        console.log(err)
      });

      getBoundQ4(mode).then((res) => {
        SetQ4(res[0]);
      }).catch((err) => {
        console.log(err)
      });
    } else {
      console.log('total')
    }
  },[currmode])


  return (
    <LegendContainer> 
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><BlueCircle /></span>
            {currmode === '' || currmode === 'total' ? <span>Quartile 1</span> : <span>{q1.min}{currmode === 'income' ? '' : '%'} - {q1.max}{currmode === 'income' ? '' : '%'}</span>}
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><RedCircle /></span>
            {currmode === '' || currmode === 'total' ? <span>Quartile 2</span> : <span>{q2.min}{currmode === 'income' ? '' : '%'} - {q2.max}{currmode === 'income' ? '' : '%'}</span>}
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><GreenCircle /></span>
            {currmode === '' || currmode === 'total' ? <span>Quartile 3</span> : <span>{q3.min}{currmode === 'income' ? '' : '%'} - {q3.max}{currmode === 'income' ? '' : '%'}</span>}
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><BlackCircle /></span>
            {currmode === '' || currmode === 'total' ? <span>Quartile 4</span> : <span>{q4.min}{currmode === 'income' ? '' : '%'} - {q4.max}{currmode === 'income' ? '' : '%'}</span>}
          </div>
        </div>
      </div>
    </LegendContainer>
  )
    

}
export default Legend;
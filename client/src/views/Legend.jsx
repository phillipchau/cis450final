import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const LegendContainer = styled.div`
height: 100px;
width:97%;
text-align: left;
padding:20px;
position: absolute;

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


function Legend() {
  return (
    <LegendContainer> 
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><BlueCircle /></span>
            <span>Quartile 1</span>
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><RedCircle /></span>
            <span>Quartile 2</span>
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><GreenCircle /></span>
            <span>Quartile 3</span>
          </div>
          <div class="col-sm">
            <span style={{display: 'inline-block', marginRight: 10}}><BlackCircle /></span>
            <span>Quartile 4</span>
          </div>
        </div>
      </div>
    </LegendContainer>
  )
    

}
export default Legend;
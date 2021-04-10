import React from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function LandingPage() {
  return (
    <>
      <LandingHeaderText>
        Welcome to the CIS 450 Final Project from Group 36!
      </LandingHeaderText>
      <TextBlockLink to="/map">Map</TextBlockLink>
      <TextBlockLink to="/plot">Plot</TextBlockLink>
    </>
  );
}

export default LandingPage;

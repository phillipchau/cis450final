import React from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function PlotPage() {
  return (
    <div>
      <LandingHeaderText>
        This is the Plot page.
      </LandingHeaderText>
      <TextBlockLink to="/">Return to homepage.</TextBlockLink>
    </div>
  );
}

export default PlotPage;

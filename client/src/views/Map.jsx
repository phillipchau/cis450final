import React from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function MapPage() {
  return (
    <div>
      <LandingHeaderText>
        This is the Map page.
      </LandingHeaderText>
      <TextBlockLink to="/">Return to homepage.</TextBlockLink>
    </div>
  );
}

export default MapPage;

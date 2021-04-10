import React from 'react';
import { TextBlockLink } from '../components/core/Link';
import { LandingHeaderText } from '../components/core/Text';

function NotFound() {
  return (
    <div>
      <LandingHeaderText>
        Uh oh! Page not found (404 error).
      </LandingHeaderText>
      <TextBlockLink to="/">
        Click here to return to home &#8594;
      </TextBlockLink>
    </div>
  );
}

export default NotFound;

import React from 'react';
import styled from 'styled-components';

const createContainer = (Container, props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const StyledMainContainer = styled.div`
  margin: 0 auto;
  padding: 10vw 0;
  width: 80%;
`;

export const MainContainer = (props) => createContainer(StyledMainContainer, props);

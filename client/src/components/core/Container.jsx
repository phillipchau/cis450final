import React from 'react';
import styled from 'styled-components';

const createContainer = (Container, props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const StyledMainContainer = styled.div`
  margin: 0 auto;
  padding: 8vw 0;
  width: 90%;
`;

const StyledMinimalContainer = styled.div`
  margin: 0 auto;
  padding: 4vw 0;
  width: 80%;
`;

export const MainContainer = (props) => createContainer(StyledMainContainer, props);

export const MinimalContainer = (props) => createContainer(StyledMinimalContainer, props);

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChildFlexContainer = styled.div`
  flex: ${props => props.flex ? props.flex : 1};
  max-height: 450px;
  overflow: auto;
  margin: 0 1rem;
  background: white;
  padding: 1rem;
  text-align: left;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

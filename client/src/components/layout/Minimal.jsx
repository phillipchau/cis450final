import React from 'react';
import styled from 'styled-components';
import Header from '../navigation/Header';
import { MinimalContainer } from '../core/Container';

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font};
`;

function MinimalLayout({ children }) {
  return (
    <Content>
      <Header />
      <MinimalContainer>
        {children}
      </MinimalContainer>
    </Content>
  );
}

export default MinimalLayout;

import React from 'react';
import styled from 'styled-components';
import Header from '../navigation/Header';
import { HomeContainer } from '../core/Container';

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font};
`;

function HomeLayout({ children }) {
  return (
    <Content>
      <Header />
      <HomeContainer>
        {children}
      </HomeContainer>
    </Content>
  );
}

export default HomeLayout;

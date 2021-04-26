import React from 'react';
import styled from 'styled-components';
import { MinimalContainer } from '../core/Container';

const Content = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font};
`;

function LoginLayout({ children }) {
  return (
    <Content>
      <MinimalContainer>
        {children}
      </MinimalContainer>
    </Content>
  );
}

export default LoginLayout;
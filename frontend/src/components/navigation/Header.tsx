import React from 'react';
import styled from 'styled-components';
import { NavbarLink } from '../core/Link';

const Content = styled.div`
  height: 50px;
  padding: 20px;
  text-align: center;
`;

const LeftHeader = styled(NavbarLink)`
  float: left;
  margin-left: 50px;
  font-weight: bold;
`;

const RightHeader = styled(NavbarLink)`
  float: right;
  margin-right: 50px;
`;

// Note: Can also create a center header with simply display: inline-block

function Header() {
  return (
    <Content>
      <nav>
        <LeftHeader to="/">
          OFTW @ Penn
        </LeftHeader>
        <RightHeader to="/map">
          Map
        </RightHeader>
        <RightHeader to="/plot">
          Plot
        </RightHeader>
      </nav>
    </Content>
  );
}

export default Header;

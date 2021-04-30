import React from 'react';
import styled from 'styled-components';
import { NavbarLink } from '../core/Link';
import { NavbarButton } from '../core/Button';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

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

const RightEdgeHeaderButton = styled(NavbarButton)`
  float: right;
  margin-right: 50px;
`;

const RightHeader = styled(NavbarLink)`
  float: right;
  margin-right: 20px;

  @media (max-width: 1000px) {
    margin-right: 10px;
  }
`;

// Note: Can also create a center header with simply display: inline-block

function Header() {
  const history = useHistory();
  const logout = () => {
    axios.get('http://localhost:8081/logout', {withCredentials: true})
      .then((res) => history.push('/login'))
      .catch((err) => {
        console.log(err)
    });
  }
  return (
    <Content>
      <nav>
        <LeftHeader to="/">
          CIS 450 Final Project
        </LeftHeader>
        <RightEdgeHeaderButton
          onClick={logout}
        >
          Logout
        </RightEdgeHeaderButton>
        <RightHeader to="/plot">
          Plot
        </RightHeader>
        <RightHeader to="/map">
          Map
        </RightHeader>
        <RightHeader to="/vaccinepage">
          Vaccine
        </RightHeader>
        <RightHeader to="/">
          Dashboard
        </RightHeader>
      </nav>
    </Content>
  );
}

export default Header;

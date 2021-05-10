import React from 'react';
import styled from 'styled-components';
import { NavbarLink } from '../core/Link';
import { NavbarButton } from '../core/Button';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import app from '../../api/Firebase';

const Content = styled.div`
  height: 50px;
  padding: 50px;
  text-align: center;
  background-color:#054A91;
`;

const LeftHeader = styled(NavbarLink)`
  float: left;
  margin-left: 50px;
  font-weight: bold;
  color:white;
  font-size:30px;
`;

const RightEdgeHeaderButton = styled(NavbarButton)`
  float: right;
  margin-right: 50px;
  color:white;
`;

const RightHeader = styled(NavbarLink)`
  float: right;
  margin-right: 20px;
  color:white;

  @media (max-width: 1000px) {
    margin-right: 10px;
  }
`;

// Note: Can also create a center header with simply display: inline-block

function Header() {
  const history = useHistory();
  const logout = () => {
    // Sign out of Google login (only does action if that is used).
    app.auth().signOut();

    // Sign out of primary AWS registration.
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
          COVID Dashboard
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
        <RightHeader to="/vaccine">
          Vaccine
        </RightHeader>
        <RightHeader to="/user">
          My Profile
        </RightHeader>
        <RightHeader to="/">
          Dashboard
        </RightHeader>
      </nav>
    </Content>
  );
}

export default Header;

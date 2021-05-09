import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import app from '../../api/Firebase';
import { Button } from '../core/Button';

const GoogleButton = styled(Button)`
  position: relative;
  display: block;
  margin: 10px auto;
  background: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const GoogleImage = styled.img`
  display: inline;
  position: absolute;
  left: 15px;
  width: 30px;
  vertical-align: middle;
`;

function GoogleLogin(props) {
  const { successAction, errorAction } = props;

  const onSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth()
      .signInWithRedirect(provider)
      .then(() => successAction())
      .catch((err) => errorAction(err.message));
  };

  return (
    <GoogleButton type="button" className="login-provider-button" onClick={onSubmit}>
      <GoogleImage src="https://img.icons8.com/fluent/48/000000/google-logo.png" />
      <span> Google</span>
    </GoogleButton>
  );
}

export default GoogleLogin;

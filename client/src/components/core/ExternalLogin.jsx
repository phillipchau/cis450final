import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import app from '../../api/Firebase';
import { Button } from './Button';

const AppButton = styled(Button)`
  position: relative;
  display: block;
  margin: 0 10px;
  background: ${({ theme }) => theme.colors.white};
`;

const AppImage = styled.img`
  display: inline;
  position: absolute;
  left: 15px;
  width: 1.5rem;
`;

const AppText = styled.span`
  padding-left: 35px;
`;

export function GoogleLogin(props) {
  const { successAction, errorAction } = props;

  const onSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth()
      .signInWithRedirect(provider)
      .then(() => {
        successAction()
      })
      .catch((err) => {
        errorAction(err.message)
      });
  };

  return (
    <AppButton type="button" onClick={onSubmit}>
      <AppImage src="https://img.icons8.com/fluent/48/000000/google-logo.png" />
      <AppText>Google</AppText>
    </AppButton>
  );
}

export function FacebookLogin(props) {
  const { successAction, errorAction } = props;

  const onSubmit = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    app.auth()
      .signInWithRedirect(provider)
      .then(() => {
        successAction()
      })
      .catch((err) => {
        errorAction(err.message)
      });
  };

  return (
    <AppButton type="button" onClick={onSubmit}>
      <AppImage src="https://img.icons8.com/color/344/facebook-new.png" />
      <AppText> Facebook</AppText>
    </AppButton>
  );
}

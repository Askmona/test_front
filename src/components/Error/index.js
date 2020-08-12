import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import errorImg from './error.png';

const StyledError = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  font-size: 2em;
  padding: 1rem;
`;

const Error = ({ error }) => (
  <StyledError>
    <img src={errorImg} alt=""/>
    <ErrorText>{ error && error.message ? error.message : 'Une erreur est survenu' }</ErrorText>
    <Link className="error__link" to="/">Retour à l'accueil</Link>
  </StyledError>
);

export default Error;

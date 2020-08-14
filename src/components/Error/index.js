import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import vanGogh from './lanuitetoilee.jpg';

const StyledError = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitleBackground = styled.p`
  background-image: url(${vanGogh});
  background-size: cover;
  background-clip: text; 
  -webkit-background-clip: text;
  color: transparent;
  font-size: 120px; 
  text-align: center; 
  font-weight: bold; 
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  padding: 12px 24px;
  background-color: #F1EEEE;
  color: #8E8E8E;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  z-index: 1;

  span {
    z-index: 1;
    position: relative;
  }

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 140px;
    border-radius: 50%;
    transform: translate3d(-50%,-50%,0) scale3d(0,0,0);
    transition: opacity .4s cubic-bezier(.19,1,.22,1),transform .75s cubic-bezier(.19,1,.22,1);
    background-color: #4054B2;
    opacity: 0;
  }

  :hover span {
    color: #FFF;
  }

  :hover::before {
    opacity: 1;
    transition-duration: .85s;
    transform: translate3d(-50%,-50%,0) scale3d(1,1,1);
  }
`;

const ErrorText = styled.div`
  font-size: 1.6em;
  padding: 1rem;
  color: #8E8E8E;
`;

const StyledTextError = styled.div`
  font-size: 2em;
  font-weight: 900;
`;

const Error = ({ error }) => (
  <StyledError>
    <StyledTextError>Oops,</StyledTextError>
    <StyledTitleBackground>Erreur</StyledTitleBackground>
    <ErrorText>{ error && error.message ? error.message : 'Une erreur est survenu' }</ErrorText>
    <StyledLink className="error__link" to="/"> <span>Retour à l'accueil</span></StyledLink>
  </StyledError>
);

export default Error;

import React from 'react';
import { Parallax } from 'react-parallax';
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const StyledZoomWrapper = styled.div`
  width: 100%;
  height: 1000px;
  position: relative;
  overflow: hidden;
`;

const StyledTextTitle = styled.h1`
  font-family: 'Abril Fatface', cursive;
  font-size: 7em;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.51);
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  letter-spacing: 5.1px;
  transform: translateY(50%);
  color: #FFF;
  ${mediaQueries('s')`
    font-size: 4em;
    bottom: -150px
  `};
`;

const StyledTextContent = styled.p`
  font-family: 'Abril Fatface', cursive;
  font-size: 1.8em;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.51);
  position: absolute;
  width: 100%;
  text-align: center;
  right: 0;
  top: 0;
  bottom: -220px;
  transform: translateY(50%);
  color: #FFF;
  ${mediaQueries('special')`
    bottom: -450px;
  `};
  ${mediaQueries('s')`
    font-size: 1.4em;
  `};
`;

const StyledSvg = styled.svg`
  position: absolute;
  bottom: 60px;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 8;
  fill: #FFF;
  animation: arrowAnimation 1.5s infinite ease-out;

@keyframes arrowAnimation {
  0% {
    transform: translateY(-20px);
    opacity: 0
  }
  30% {
    opacity: 1
  }
  60% {
    opacity: 1
  }
  to {
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
    opacity: 0
  }
}
`;

const Home = () => (
  <>
  <Parallax 
    blur={{min: -15, max: 15}}
    bgImage={require('./zoom.jpg')}
    bgImageAlt="Thomas Couture - Les Romains de la décadence"
    strength={200}
  >
    <StyledZoomWrapper>
      <div>
        <StyledTextTitle>Liste des musées</StyledTextTitle>
        <StyledTextContent>Les plus beaux musées Français référencés par villes</StyledTextContent>
      </div>
      <StyledSvg xmlns="http://www.w3.org/2000/svg" width="14" height="20" fill="#FFF">
        <path d="M7.5 0a.5.5 0 01.5.5v16.17l4.44-4.45a.5.5 0 01.71 0l.7.71a.5.5 0 010 .71l-6.13 6.14a.75.75 0 01-.53.22h-.38a.77.77 0 01-.53-.22L.15 13.64a.5.5 0 010-.71l.7-.71a.49.49 0 01.7 0L6 16.67V.5a.5.5 0 01.5-.5z"></path>
      </StyledSvg>
    </StyledZoomWrapper>
  </Parallax>
  </>
);

export default Home;

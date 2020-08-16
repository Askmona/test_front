import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

import banner from './banner-header.png';

import askMona from './ask-mona.png';

const Navbar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 3rem;
  position: ${props => props.background ? 'none' : 'absolute'};
  top: 0;
  z-index: 10;
  background: ${props => props.background ? `url(${banner})` : 'none'};
`;

const Navigation = styled.div`
  align-items: center;
  ${mediaQueries('m')`
    margin: 0 auto;
    display: flex;
  `};
  ${mediaQueries('s')`
    margin-top: .6rem;
  `};
`;

const StyledImage = styled.img`
  ${mediaQueries('m')`
    margin: 0 auto;
  `};
`;

const active = 'active';

const StyledLink = styled(NavLink).attrs({ active })`
  color: #FFF;
  font-size: 1.2em;
  font-weight: 600;
  margin-right: 4rem;
  position: relative;
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #FFF;
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    ${mediaQueries('m')`
        display:none;
      `};
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  &.${active} {
    display: inline-block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(1);
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #FFF;
      transform-origin: bottom left;
      transition: transform .3s ease-in-out;
      ${mediaQueries('m')`
        display:none;
      `};
    }
    
    &:hover::after {
      transform: scaleX(0);
      transform-origin: bottom right;
    }
  }
  ${mediaQueries('m')`
    margin-right: 1rem;
  `};
  ${mediaQueries('xs')`
    margin-right: .7rem;
  `};
`;

const Header = ({ background }) => {
  const displayBackground = background ? background : null;
  return (
    <Navbar background={displayBackground} >
      <StyledImage src={askMona} alt=""/>
      <Navigation>
        <StyledLink to="/" exact>Les musées à découvrir</StyledLink>
        <StyledLink to="/night-museum-2018" exact>Nuit des musées 2018</StyledLink>
      </Navigation>
    </Navbar>
  );
}

export default Header;

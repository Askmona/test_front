import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';

import askMona from './ask-mona.png';

const Navbar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.05);
`;

const Navigation = styled.div`
  align-items: center;
`;

const active = 'active';

const StyledLink = styled(NavLink).attrs({ active })`
  color: #2E2E7A;
  text-transform: lowercase;
  font-size: 1em;
  font-weight: 500;
  margin-right: 4rem;
  position: relative;
  display: inline-block;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #2E2E7A;
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
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
      bottom: 0;
      left: 0;
      background-color: #2E2E7A;
      transform-origin: bottom left;
      transition: transform .3s ease-in-out;
    }
    
    &:hover::after {
      transform: scaleX(0);
      transform-origin: bottom right;
    }
  }
`;

const Header = () => (
  <Navbar>
    <img src={askMona} alt=""/>
    <Navigation>
      <StyledLink to="/" exact>Liste des musées</StyledLink>
      <StyledLink to="/night-museum-2018">Nuit des musées 2018</StyledLink>
    </Navigation>
  </Navbar>
);

export default Header;

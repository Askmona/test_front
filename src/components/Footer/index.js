import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const StyledFooter = styled.footer`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  width: 100%;
  text-align: center;
  height: 50px;
  background: #2e2e7a;
  color: #FFF;
  ${mediaQueries('s')`
    font-size: 1.2em;
  `};
`;

const Footer = () => (
  <StyledFooter>&copy; Created with &#10084; by Benoit</StyledFooter>
);

export default Footer;

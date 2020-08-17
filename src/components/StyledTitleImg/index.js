import styled from 'styled-components';
import bannerText from './banner-text.png'
import { mediaQueries } from '../../theme/index.js';

const StyledTitleImg = styled.h1`
  background-image: url(${bannerText});
  background-size: cover;
  background-size: contain;
  background-position-x: center;
  background-clip: text; 
  -webkit-background-clip: text;
  color: transparent;
  font-size: 70px; 
  text-align: center; 
  font-weight: bold; 
  text-transform: uppercase;
  width: 80%;
  margin: 2rem auto 0;
  ${mediaQueries('m')`
    width: 90%;
    font-size: 3.2em;
  `};
  ${mediaQueries('s')`
    font-size: 2.2em;
  `};
  ${mediaQueries('xs')`
    font-size: 2em;
  `}; 
`;

export default StyledTitleImg;

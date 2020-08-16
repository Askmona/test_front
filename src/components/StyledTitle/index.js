import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const StyledTitle = styled.h3`
  color: #282828;
  font-family: 'Montserrat', sans-serif;
  font-size: 4em;
  text-transform: uppercase;
  font-weight: 500;
  text-align: ${props => props.textAlign ? "center" : "left"};
  margin: 2.6rem auto .5rem;
  line-height: .9em;
  span {
    display: inline-block;
    color: #FFF;
    font-size: .9em;
    -webkit-text-stroke: 1px #282828;
  }
  ${mediaQueries('m')`
    font-size: 3em;
  `};
  ${mediaQueries('s')`
    font-size: 2em;
    margin-top: 1rem;
  `};
`;

export default StyledTitle;
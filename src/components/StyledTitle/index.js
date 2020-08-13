import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const StyledTitle = styled.h1`
  width: 100%;
  font-size: 2.6em;
  text-align: center;
  margin: 2rem 0 3rem;
  color: #2e2e7a;
  font-weight: 900; 
  ${mediaQueries('s')`
    font-size: 2.2em
  `};
  ${mediaQueries('xs')`
    font-size: 2em
  `};
`;

export default StyledTitle;
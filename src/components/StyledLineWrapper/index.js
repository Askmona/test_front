import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const StyledLineWrapper = styled.div`
width: 70%;
margin: 2rem auto;
${mediaQueries('s')`
  width: 95%;
`};
`;

export default StyledLineWrapper
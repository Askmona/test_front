import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mediaQueries } from '../../theme/index.js';

const StyledLimitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin: 1rem;
  color: #8E8E8E;
  ${mediaQueries('s')`
    flex-direction: column;
  `};
`;

const StyledSelect = styled.select`
    padding: .8rem;
    margin-left: 1rem;
    font-size: 1rem;
    color: #8E8E8E;
    border: none;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.05);
    border-radius: 10px;
    :focus {
      outline: none;
    }
`;

const SelectPoint = ({ handleChange, limitPoint }) => (
  <StyledLimitWrapper>
    <p>Nombre de points maximun</p>
      <StyledSelect
      name="list-supports"
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      >
        <option>
          Sélectionnez
        </option>
        {limitPoint.map(point => (
          <option value={point.limit} key={point.id}>
            {point.limit}
          </option>
        ))}
      </StyledSelect>
  </StyledLimitWrapper>
);

SelectPoint.propTypes = {
  handleChange: PropTypes.func.isRequired,
  limitPoint: PropTypes.arrayOf(PropTypes.shape({
    limit: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default SelectPoint;

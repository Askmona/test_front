import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar';
import Card from './Card';
import Pagination from '../Pagination';
import StyledListMuseum from '../StyledListMuseum';
import { mediaQueries } from '../../theme/index.js';

const MuseumWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mediaQueries('m')`
    width: 65%;
  `};
`;

const Museum = ({
  museums,
  value,
  handleChange,
  handleSubmit,
  pageTotal,
  currentPage,
  handleClickNext,
  handleClickPrev,
  handleClickLast,
  handleClickFirst,
}) => (
  <>
    <StyledListMuseum>
      <SearchBar
        value={value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <MuseumWrapper>
        {museums.map((musem) => (
          <Card
            data-jest='card-museum'
            {...musem.record.fields}
            key={musem.record.id}
            id={musem.record.id}
          />
        ))}
      </MuseumWrapper>
    </StyledListMuseum>
    <Pagination
      pageTotal={pageTotal}
      currentPage={currentPage}
      handleClickPrev={handleClickPrev}
      handleClickNext={handleClickNext}
      handleClickLast={handleClickLast}
      handleClickFirst={handleClickFirst}
    />
  </>
);

Museum.propTypes = {
  museums: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pageTotal: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
  handleClickLast: PropTypes.func.isRequired,
  handleClickFirst: PropTypes.func.isRequired,
};

export default Museum;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import SearchBar from '../SearchBar';
import Card from './Card';
import Pagination from '../Pagination';
import StyledTitle from '../StyledTitle';
import StyledListMuseum from '../StyledListMuseum';

const MuseumWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
      <StyledTitle>Liste des musées</StyledTitle>
      <SearchBar
        value={value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <MuseumWrapper>
        {museums.map((musem) => (
          <Card
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

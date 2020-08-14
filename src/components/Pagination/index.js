import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';
import PropTypes from 'prop-types';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
  text-align: center;
`;

const LinkPaginate = styled.a`
  color: #4054b2;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  padding: 1rem
  ${mediaQueries('s')`
    font-size: 1em
  `};
`;

const CurrentNum = styled.a`
  padding: 0px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  background: #4054b2;
  color: #FFF;
  font-size: 1.2em;
  transition: .3s;
  font-weight: bold;
  ${mediaQueries('s')`
    font-size: 1em;
  `};
  ${mediaQueries('xs')`
    padding: 0rem 1rem;
  `};
`;

const Pagination = ({
  currentPage,
  pageTotal,
  handleClickPrev,
  handleClickNext,
  handleClickLast,
  handleClickFirst,
}) => {
  const page = Math.ceil(currentPage / 8 + 1);
  const lastPage = Math.ceil(pageTotal / 8 + 1);
  console.log(page);
  console.log(lastPage);
  if ( pageTotal <= 8 ) {
    return null;
  }
  return (
    <PaginationWrapper>
      <LinkPaginate data-jest='paginate-first' onClick={handleClickFirst}>{page !== 1 ? '1' : ''}</LinkPaginate>
      <LinkPaginate data-jest='paginate-prev' onClick={handleClickPrev}>{page !== 1 ? '<' : ''}</LinkPaginate>
      {page >= 2 &&
      <LinkPaginate data-jest='paginate-prev2' onClick={handleClickPrev}>{page - 1}</LinkPaginate>}
      <CurrentNum data-jest='paginate-current'>{page}</CurrentNum>
      {!(page >= lastPage) &&
      <LinkPaginate data-jest='paginate-next' onClick={handleClickNext}>{page + 1}</LinkPaginate>}
      <LinkPaginate data-jest='paginate-next2' onClick={handleClickNext}>{page !== lastPage ? '>' : ''}</LinkPaginate>
      <LinkPaginate data-jest='paginate-last' onClick={handleClickLast}>{page !== lastPage ? lastPage : ''}</LinkPaginate>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageTotal: PropTypes.number.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickLast: PropTypes.func.isRequired,
  handleClickFirst: PropTypes.func.isRequired,
}

export default Pagination;

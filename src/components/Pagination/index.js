import React from 'react';
import styled from 'styled-components';


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkPaginate = styled.a`
  color: #4054b2;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  padding: 1rem
`;

const CurrentNum = styled.a`
  border-radius: 50%;
  background: #4054b2;
  color: #FFF;
  font-size: 1.2em;
  transition: .3s;
  font-weight: bold;
  padding: 1rem 1.2rem;
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
  return (
    <PaginationWrapper>
      <LinkPaginate onClick={handleClickFirst}>1</LinkPaginate>
      <LinkPaginate onClick={handleClickPrev}>&lt;</LinkPaginate>
      {page >= 2 &&
      <LinkPaginate onClick={handleClickPrev}>{page - 1}</LinkPaginate>}
      <CurrentNum>{page}</CurrentNum>
      {!(page >= lastPage) &&
      <LinkPaginate onClick={handleClickNext}>{page + 1}</LinkPaginate>}
      <LinkPaginate onClick={handleClickNext}>&gt;</LinkPaginate>
      <LinkPaginate onClick={handleClickLast}>{pageTotal - 1}</LinkPaginate>
    </PaginationWrapper>
  );
}

export default Pagination;

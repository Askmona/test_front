import React, { useEffect, useState, FunctionComponent } from "react";
import styled from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Container,
  Box,
  TextField,
  //   Button,
  InputAdornment,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ClearIcon from "@material-ui/icons/Clear";

import MuseumsList from "../components/MuseumsList";
import IMuseumsList from "../models/museumsListModel";
import { fetchMuseumList } from "../api";

const MainContainer = styled(Container)`
  background: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ListBox = styled(Box)`
  padding: 2em;
`;

const Title = styled.h1`
  text-align: center;
`;

const SearchSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// const SearchButton = styled(Button)`
//   margin: 16px;
// `;

const ClearButton = styled(InputAdornment)`
  :hover {
    cursor: pointer;
  }
`;

const Search = styled(TextField)``;

const Home: FunctionComponent = (): JSX.Element => {
  const [museumsList, setMuseumList] = useState<IMuseumsList>();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {});

  useEffect(() => {
    fetchMuseumList(query, page).then((museums) => setMuseumList(museums));
  }, [page, query]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleSearchFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value.trim());
    event.target.value === "" && query !== "" && resetResults();
  };

  //   const handleSearchButtonClick = () => search();

  const handleSearchEnterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) =>
    e.key === "Enter" && search();

  const search = () => {
    setQuery(searchValue);
    setPage(1);
  };

  const handleClearIconClick = () => {
    resetResults();
  };

  const resetResults = () => {
    setSearchValue("");
    setQuery("");
    setPage(1);
  };

  return (
    <>
      <CssBaseline />
      <MainContainer>
        <ListBox>
          <Title>Liste des musées de France</Title>
          <SearchSection>
            <Search
              type="search"
              placeholder="Rechercher une ville"
              variant="outlined"
              onChange={handleSearchFieldChange}
              onKeyPress={handleSearchEnterKeyDown}
              InputProps={{
                endAdornment: searchValue !== "" && searchValue != null && (
                  <ClearButton position="end" onClick={handleClearIconClick}>
                    <ClearIcon />
                  </ClearButton>
                ),
              }}
              value={searchValue}
              fullWidth
            />
            {/* <SearchButton
              variant="contained"
              color="primary"
              onClick={handleSearchButtonClick}
            >
              Rechercher
            </SearchButton> */}
          </SearchSection>
          <MuseumsList list={museumsList} />
          <Pagination
            count={museumsList ? Math.ceil(museumsList.nhits / 10) : 0}
            page={page}
            onChange={handlePageChange}
          />
        </ListBox>
      </MainContainer>
    </>
  );
};

export default Home;

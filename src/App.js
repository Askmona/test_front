import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import styled, { ThemeProvider } from "styled-components"
import theme from "./theme/";
import "./theme/baseline.css";

import Header from './components/Header';
import Museum from './components/Museum';
import MuseumDetails from './components/MuseumDetails';
import Loader from './components/Loader';
import NightMuseum from './components/NightMuseum';
import Error from './components/Error';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  background: white;
  min-height: 100vh;
  flex-direction: column;
  white-space: pre-line;
  width: 100%;
`;

const App = () => {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageTotal, setPageTotal] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    FetchListMuseum(currentPage, search);
  }, [currentPage, search])

  const FetchListMuseum = (currentPage, search) => {
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/records?search=${search}&rows=8&start=${currentPage}`)
    .then(response => {
      setPageTotal(response.data.total_count);
      setMuseums(response.data.records);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
    });
  }

  const setInputValue = (value) => {
    setSearchValue(value);
  }

  const setSearchSubmit = () => {
    setLoading(true);
    setCurrentPage(0);
    setSearch(searchValue);
    setSearchValue('');
  }

  const setPaginationNext = () => {
    if (currentPage < pageTotal - 8) {
      setLoading(true);
      setCurrentPage(currentPage + 8 );
    } else {
      setCurrentPage(currentPage + (pageTotal - currentPage - 1));
    }
  }

  const setPaginationPrev = () => {
    if (currentPage > 0) {
      setLoading(true);
      setCurrentPage(currentPage - 8);
    }
  }

  const setPaginationLast = () => {
    if (currentPage !== pageTotal -1) {
      setLoading(true);
      setCurrentPage(pageTotal -1);
    }
  }

  const setPaginationFirst = () => {
    if (currentPage !== 0) {
      setLoading(true);
      setCurrentPage(0);
    }
  }
  if(error) {
    return <> 
      <Error error={error}/> 
    </>
  }

  return (
    <Router>
      <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Container>
            <Box>
              <Switch>
                <Route path="/" exact>
                  <Header />
                  <Home />
                  {loading &&
                    <Loader />}
                  {!loading &&
                  <Museum
                    museums={museums}
                    value={searchValue}
                    handleChange={setInputValue}
                    handleSubmit={setSearchSubmit}
                    pageTotal={pageTotal}
                    currentPage={currentPage}
                    handleClickNext={setPaginationNext}
                    handleClickPrev={setPaginationPrev}
                    handleClickLast={setPaginationLast}
                    handleClickFirst={setPaginationFirst}
                  />}
                </Route>
                <Route path="/museum/:id">
                  <Header background/>
                  <MuseumDetails />
                </Route>
                <Route path="/night-museum-2018" exact>
                  <Header background/>
                  <NightMuseum />
                </Route>
                <Route>
                  <Error error={error}/>
                </Route>
              </Switch>
              <Footer />
            </Box>
          </Container>
        </ThemeProvider>
    </Router>
  );
}

export default App;

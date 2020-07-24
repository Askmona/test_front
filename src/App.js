import React from 'react';
import styled, { ThemeProvider } from "styled-components"
import theme from "./theme/";
import "./css/reset.css";
import "./css/global.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
} from "@material-ui/core";
import Home from "views/Home.js";
import NotFound from "views/NotFound.js";
import Night2018 from "views/Night2018.js";
import Museum from "views/Museum.js";
import AppHeader from "components/AppHeader.js";
import { StylesProvider } from "@material-ui/styles";
import AppContext, { useAppContextInit } from "contexts/AppContext.js";

const S = {};
S.Container = styled.div`
  background-color: ${props => props.theme.color.bg};
  color: ${props => props.theme.color.primary};
  min-width: 100%;
  min-height: 100vh;
  padding-bottom: 2em;
`;

function App() {
  const appContextValue = useAppContextInit();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AppContext.Provider value={appContextValue}>
          <S.Container>
            <Router>
              <AppHeader />
              <Container maxWidth="sm">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/museum/:museumID" component={Museum} />
                  <Route path="/night2018" component={Night2018} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </Container>
            </Router>
          </S.Container>
        </AppContext.Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

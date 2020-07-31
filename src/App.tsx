import React from 'react';
import styled, { ThemeProvider } from "styled-components"
import theme from "./theme";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css';
import "./theme/baseline.css";
import { MuseumList } from './components/museum-list';
import { MuseumDetails } from './components/museum-details';
import { MuseumNight } from './components/museum-night';
import { MuseumMenu } from './components/museum-menu';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1280px;
  margin: auto;
`

const Box = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  background: white;
  flex-direction: column;
  white-space: pre-line;
  padding: 5px;
`

function App() {
  return (
    <Router>

      <ThemeProvider theme={theme}>
        <Container>
          <Box>
            <MuseumMenu />
            <Switch>
              <Route path='/museum/:refMusee'>
                <MuseumDetails />
              </Route>
              <Route path='/museum_night'>
                <MuseumNight />
              </Route>
              <Route path='/'>
                <MuseumList />
              </Route>
            </Switch>
          </Box>
        </Container>
      </ThemeProvider >
    </Router >
  );
}

export default App;

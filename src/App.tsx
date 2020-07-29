import React, { FunctionComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Home from "./routes/Home";
import MuseumDetails from "./routes/MuseumDetails";

const App: FunctionComponent = (props) => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/museum/:id">
          <MuseumDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

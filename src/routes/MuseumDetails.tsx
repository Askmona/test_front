import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Record } from "../models/museumsListModel";

const MuseumDetails: FunctionComponent<RouteComponentProps<{}, any, Record>> = (
  props
) => {
  const { state } = props.location;

  return <h1>{state.fields.nom_du_musee}</h1>;
};

export default withRouter(MuseumDetails);

import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Paper, ListItem, ListItemText, List } from "@material-ui/core";
import styled from "styled-components";

import { Record } from "../models/museumsListModel";
import theme from "../theme";

const Title = styled.h1`
  color: ${theme.color.primary};
`;

const Subtitle = styled.h2`
  color: ${theme.color.secondary};
`;

const StyledPaper = styled(Paper)`
  height: 100vh;
  padding: 1em 2em;
`;

const MuseumDetails: FunctionComponent<RouteComponentProps<{}, any, Record>> = (
  props
) => {
  const {
    state: { fields },
  } = props.location;

  return (
    <StyledPaper>
      <Title>{fields.nom_du_musee}</Title>
      <Subtitle>Informations</Subtitle>
      <List>
        <ListItem>
          <ListItemText
            primary="Adresse"
            secondary={`${fields.adr}, ${fields.cp}, ${fields.ville}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Periode d'ouverture"
            secondary={fields.periode_ouverture ?? "Non renseigné"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Site web"
            secondary={fields.sitweb ?? "Non renseigné"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Téléphone"
            secondary={fields.telephone1 ?? "Non renseigné"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fax"
            secondary={fields.fax ?? "Non renseigné"}
          />
        </ListItem>
      </List>
    </StyledPaper>
  );
};

export default withRouter(MuseumDetails);

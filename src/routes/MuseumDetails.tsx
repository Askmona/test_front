import React, { FunctionComponent, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Paper, ListItem, ListItemText, List } from "@material-ui/core";
import styled from "styled-components";

import { Record, IMuseum } from "../models/museumsListModel";
import theme from "../theme";
import { fetchMuseum } from "../api";

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

interface IParams {
  id: string;
}

const MuseumDetails: FunctionComponent<RouteComponentProps<
  IParams,
  any,
  Record
>> = (props) => {
  const {
    match: { params },
  } = props;

  const [museum, setMuseum] = useState<IMuseum>();

  useEffect(() => {
    fetchMuseum(params.id).then((museum: IMuseum) => setMuseum(museum));
  }, [params.id]);

  return (
    <StyledPaper>
      <Title>{museum?.record.fields.nom_du_musee}</Title>
      <Subtitle>Informations</Subtitle>
      <List>
        <ListItem>
          <ListItemText
            primary="Adresse"
            secondary={`${museum?.record.fields.adr}, ${museum?.record.fields.cp}, ${museum?.record.fields.ville}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Periode d'ouverture"
            secondary={
              museum?.record.fields.periode_ouverture ?? "Non renseigné"
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Site web"
            secondary={museum?.record.fields.sitweb ?? "Non renseigné"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Téléphone"
            secondary={museum?.record.fields.telephone1 ?? "Non renseigné"}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fax"
            secondary={museum?.record.fields.fax ?? "Non renseigné"}
          />
        </ListItem>
      </List>
    </StyledPaper>
  );
};

export default withRouter(MuseumDetails);

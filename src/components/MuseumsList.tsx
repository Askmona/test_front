import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemText, Paper } from "@material-ui/core";

import { IMuseumsList, Record } from "../models/museumsListModel";

interface IProps {
  list?: IMuseumsList;
}

const MuseumsList: FunctionComponent<IProps> = ({ list }) => {
  const history = useHistory();

  const handleItemClick = (item: Record) => {
    history.push(`/museum/${item.id}`);
  };

  return (
    <List>
      <Paper>
        {list?.records.map((element) => (
          <ListItem
            key={element.record.id}
            button
            onClick={() => handleItemClick(element.record)}
          >
            <ListItemText
              primary={element.record.fields.nom_du_musee}
              secondary={element.record.fields.ville}
            />
          </ListItem>
        ))}
      </Paper>
    </List>
  );
};

export default MuseumsList;

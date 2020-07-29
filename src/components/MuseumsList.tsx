import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";

import IMuseumsList, { Record } from "../models/museumsListModel";

interface IProps {
  list?: IMuseumsList;
}

const MuseumsList: FunctionComponent<IProps> = ({ list }) => {
  const history = useHistory();

  const handleItemClick = (item: Record) => {
    history.push({ pathname: `/museum/${item.recordid}`, state: item });
  };

  return (
    <List>
      {list?.records.map((element) => (
        <ListItem
          key={element.recordid}
          button
          onClick={() => handleItemClick(element)}
        >
          <ListItemText
            primary={element.fields.nom_du_musee}
            secondary={element.fields.ville}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MuseumsList;

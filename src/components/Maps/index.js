import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';

const MapsWrapper = styled.div`
  border: 1px solid #1ba39c;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  ${mediaQueries('m')`
    width: 70%;
  `};
  ${mediaQueries('s')`
    width: 90%;
  `};
`;

const StyledMap = styled(Map)`
  width: 600px;
  height: 300px;
`;

const StyledTitleMap = styled.p`
  background: #fff;
  position: absolute;
  top: -30px;
  z-index: 300;
  margin: 20px;
  padding: 0 10px;
  font-size: 19px;
  color: #1ba39c;
`;
const Maps = ({ lat, lon }) => {
  const position = [lat, lon];
  return (
    <MapsWrapper>
    <StyledTitleMap>Plan d'accès</StyledTitleMap>
      <StyledMap center={position} zoom={12} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            test
          </Popup>
        </Marker>
      </StyledMap>
    </MapsWrapper>
  )
};

export default Maps;

// @TODO gérer les titres trop grand qui dépasse de la bannière
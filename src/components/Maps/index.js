import React from 'react';
import {
  Map,
  TileLayer,
  Marker,
} from 'react-leaflet';
import styled from 'styled-components';
import { mediaQueries } from '../../theme/index.js';
import PropTypes from 'prop-types';

const MapsWrapper = styled.div`
  border: 1px solid #1ba39c;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  width: 40%;
  margin: 2rem auto;
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
        </Marker>
      </StyledMap>
    </MapsWrapper>
  )
};

Maps.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default Maps;

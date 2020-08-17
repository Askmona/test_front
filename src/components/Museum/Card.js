import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import icon from './icon-museum.svg';

const CardWrapper = styled.div`
    max-width: 100%;
    color: #8E8E8E;
    position: relative;
    background: rgb(252,251,255);
    background: linear-gradient(177deg, rgba(252,251,255,1) 0%, rgba(255,255,255,1) 100%);
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 220px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.5em;
    text-align: center;
    min-height: 0;
    margin: 1rem .5rem;
    background: #fff;
    padding: 1rem;
    border: none;
    border-radius: 25px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.05);
    transition: .3s;
    :hover {
      transform: translateY(-10px);
      transition-timing-function: ease-out;
      box-shadow: 0 7px 13px rgba(0,0,0,.2);
      transition: .3s;
    }
`;

const MuseumCity = styled.p`
  font-size: .6em;
  font-weight: 900;
  text-transform: lowercase;;
  color: #8e8e8e5c;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const MuseumTitle = styled.p`
  color: #282828;
`;

const StyledTitleHover = styled.p`
  display: none;
  font-size: .7em;
  font-weight: 900;
  color: #4054B2;
  position: absolute;
  bottom: 15px;
  transition: .3s;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Card = ({ nom_du_musee, ville, id }) => {
  const titleEl = useRef(null);
  const displayTitle = () => {
    titleEl.current.style.display = 'block';
    titleEl.current.style.transition = '.3s';
  }
  const hideTitle = () => {
    titleEl.current.style.display = 'none';
  }
  const nameMuseum = nom_du_musee.length > 45 ? `${nom_du_musee.slice(0, 45)}...` : nom_du_musee;
  return (
    <Link to={`/museum/${id}`}>
      <CardWrapper onMouseEnter={displayTitle} onMouseLeave={hideTitle}>
        <StyledIcon src={icon} alt=""/>
        <MuseumTitle data-jest='card-title'>{nameMuseum}</MuseumTitle>
        <MuseumCity data-jest='card-city'>{ville}</MuseumCity>
        <StyledTitleHover ref={titleEl}>En savoir plus</StyledTitleHover>
      </CardWrapper>
    </Link>
  );
}

Card.propTypes = {
  nom_du_musee: PropTypes.string.isRequired,
  ville: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Card;

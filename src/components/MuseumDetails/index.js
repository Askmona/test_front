import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Loader from '../Loader';
import StyledTitleImg from '../StyledTitleImg';
import StyledTitle from '../StyledTitle';
import StyledLineWrapper from '../StyledLineWrapper';
import Error from '../Error';
import Maps from '../Maps';
import { mediaQueries } from '../../theme/index.js';
import { checkIfLink, checkIfGoodLink } from 'utils/function';

const Text = styled.p`
  color: #535353;
  text-align: center;
  margin: .2rem auto;
  font-size: 1.4em;
  width: 55%;
  line-height: 2rem;
  margin: 1rem auto;
  ${mediaQueries('m')`
    font-size: 1.2em;
  `};
`;

const StyledLink = styled.a`
  color: #535353;
  text-align: center;
  text-decoration: underline;
  margin: .2rem auto;
  font-size: 1.4em;
  width: 55%;
  line-height: 2rem;
  margin: 1rem auto;
  transition: .3s;
  :hover {
    color: #000;
    transition: .3s;
  }
  ${mediaQueries('m')`
    font-size: 1.2em;
  `};
`;

const StyledBold = styled.div`
  font-weight: bold;
  margin: 0 auto;
  color: #8E8E8E;
  width: 100%;
  text-align: center;
  ${mediaQueries('m')`
    font-size: 1em;
  `};
`;

const StyledWrapperDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubtitleCity = styled.div`
  color: #282828;
  text-align: center;
  margin: 1.5rem auto 2rem;
  letter-spacing: 15px;
  font-size: 2em;
  text-transform: uppercase;
  ::first-letter {
    text-transform: uppercase;
  }
`;

const MuseumDetails = () => {
  const [museum, setMuseum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/records/${id}`)
    .then(response => {
      setMuseum(response.data.record.fields);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
    });
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/frequentation-des-musees-de-france/records?search=${museum.nom_du_musee}`)
    .then(response => {
      setAttendance(response.data.records);
      setLoadingAttendance(false);
    })
    .catch((error) => {
      setError(error);
    });
  }, [id, museum.nom_du_musee]);

  useEffect(() => {
    if (museum) {
      document.title = museum.nom_du_musee;
    }
    if (museum.nom_du_musee === undefined) {
      document.title = 'Ask Mona';
    }
    return () => {
      document.title = 'Ask Mona';
    }
  }, [museum]);

  const attendanceArr = attendance.map((year) => {
    return {
      date: year.record.fields.annee,
      total: year.record.fields.total
    }
  }).sort(function(a, b){
    return a.date - b.date;
  });

  // Je supprime de mon tableau, les retours de l'API avec des valeurs de total à null
  const attendanceFiltered = attendanceArr.filter(item => item.total !== null);
  const data = {
    labels: attendanceFiltered.map(item => item.date),
    datasets: [
      {
        label: 'Evolution de la fréquentation',
        fill: false,
        lineTension: 0.1,
        borderColor: '#2E2E7A',
        pointBackgroundColor: '#2E2E7A',
        pointHoverBackgroundColor: '#2E2E7A',
        data: attendanceFiltered.map(item => item.total),
      }
    ]
  };

  if(error) {
    return <> 
      <Error error={error}/> 
    </>
  }
  return (
    <>
      {loading &&
      <Loader />}
      {!loading &&
      <StyledWrapperDetail>
        <StyledTitleImg>
          {museum.nom_du_musee}
        </StyledTitleImg>
        {museum.ville &&
          <StyledSubtitleCity>
            ({museum.ville})
          </StyledSubtitleCity>}
        <StyledTitle>
          Quand y <span>aller ?</span>
        </StyledTitle>
        <Text>{museum.periode_ouverture ? museum.periode_ouverture : 'Information indisponible'}</Text>
          <StyledTitle>Où les <span>trouver ?</span></StyledTitle>
          <Text>{museum.adr}<br/>{`${museum.cp} ${museum.ville}`}<br/>{museum.departement}<br/>{museum.region}</Text>
        <Text>
          Tel: {museum.telephone1 ? museum.telephone1 : 'non renseigné'}
          <br/>
          Fax: {museum.fax ? museum.fax : 'non renseigné'}
        </Text>
        {museum.sitweb &&
          checkIfLink(museum.sitweb) ?
          <StyledLink href={checkIfGoodLink(museum.sitweb)} target="_blank">Visitez leur site web</StyledLink> :
          <Text>{museum.sitweb}</Text>}
        {museum.fermeture_annuelle &&
          <StyledBold>
            <Text>Fermeture: {museum.fermeture_annuelle}</Text>
          </StyledBold>}
        {museum.coordonnees_finales &&
          <Maps {...museum.coordonnees_finales} />}
      </StyledWrapperDetail>}
        {loadingAttendance &&
      <Loader />}
        {!loadingAttendance &&
      <StyledLineWrapper>
        {attendance.length !== 0 &&
          <StyledTitle textAlign >
            Evolution de la <br/><span>fréquentation </span>
          </StyledTitle>}
          <div>
            {attendance.length !== 0 &&
            <Line data={data} width={700} height={400} options={{ maintainAspectRatio: false }} />}
          </div>
      </StyledLineWrapper>}
    </>
  );
}

export default MuseumDetails;

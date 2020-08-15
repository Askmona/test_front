import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { mediaQueries } from '../../theme/index.js';

import Loader from '../Loader';
import StyledTitleImg from '../StyledTitleImg';
import StyledTitle from '../StyledTitle';
import Error from '../Error';
import Maps from '../Maps';

const Text = styled.p`
  color: #535353;
  text-align: center;
  margin: .2rem auto;
  font-size: 1.4em;
  width: 55%;
`;

const LineWrapper = styled.div`
  width: 70%;
  margin: 2rem auto;
  ${mediaQueries('s')`
    width: 95%;
  `};
`;

const StyledBold = styled.div`
  font-weight: bold;
  margin: 0 auto;
  color: #8E8E8E;
  width: 100%;
  text-align: center;
`;

const StyledWrapperDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubtitleCity = styled.div`
  text-align: center;
  margin: 0 auto;
  letter-spacing: 15px;
  font-size: 2em;
  text-transform: lowercase;
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
        <StyledSubtitleCity>
          ({museum.ville})
        </StyledSubtitleCity>
        <StyledTitle>
          Quand y <br/><span>aller ?</span>
        </StyledTitle>
          <Text>{museum.periode_ouverture ? museum.periode_ouverture : 'Information indisponible'}</Text>
            <StyledTitle>Comment les <br/><span>joindre ?</span></StyledTitle>
            <Text>Tel: {museum.telephone1 ? museum.telephone1 : 'non renseigné'}</Text>
            <Text>Fax: {museum.fax ? museum.fax : 'non renseigné'}</Text>
            <StyledTitle>Où les <br/><span>trouver ?</span></StyledTitle>
            <Text>{museum.adr}</Text>
            <Text>{museum.ville}</Text>
            <Text>{museum.departement}</Text>
            <Text>{museum.region}</Text>
          <StyledTitle>Site web</StyledTitle>
          <Text>{museum.sitweb}</Text>
        {museum.fermeture_annuelle &&
        <StyledBold>
          <Text><span>nb:</span> Ils sont fermés le {museum.fermeture_annuelle}</Text>
        </StyledBold>}
        {museum.coordonnees_finales &&
          <Maps {...museum.coordonnees_finales} />}
      </StyledWrapperDetail>}
      {loadingAttendance &&
      <Loader />}
      {!loadingAttendance &&
      <LineWrapper>
      {attendance.length !== 0 &&
        <StyledTitle>
          Evolution de la <br/><span>fréquentation </span>
        </StyledTitle>}
        <div>
          {attendance.length !== 0 &&
          <Line data={data} width={700} height={400} options={{ maintainAspectRatio: false }} />}
        </div>
        </LineWrapper>}
    </>
  );
}

export default MuseumDetails;

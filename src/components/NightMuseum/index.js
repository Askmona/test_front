import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import Loader from '../Loader';
import StyledTitleImg from '../StyledTitleImg';
import StyledTitle from '../StyledTitle';
import Error from '../Error';
import SelectPoint from './SelectPoint';

const NightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  margin: 0 auto 2rem;
`;

const NightMuseum = () => {
  const [countByRegion, setCountByRegion] = useState([]);
  const [countByDepartment, setCountByDepartment] = useState([]);
  const [countByCity, setCountByCity] = useState([]);
  const [loadingRegion, setLoadingRegion] = useState(true);
  const [loadingDepartment, setLoadingDepartment] = useState(true);
  const [loadingCity, setLoadingCity] = useState(true);
  const [error, setError] = useState(null);
  const [limitDepartment, setLimitDepartment] = useState(20);
  const [limitCity, setLimitCity] = useState(20);

  useEffect(() => {
    // Fetch the number of events by Region
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/aggregates?select=count(*)%20as%20count&group_by=region&order_by=count(region)desc`)
    .then(response => {
      console.log(response.data)
      setCountByRegion(response.data.aggregations);
      setLoadingRegion(false);
    })
    .catch((error) => {
      setError(error);
    });
    // Fetch the number of events by department
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/aggregates?select=count(*)%20as%20count&group_by=departement&order_by=count(departement)desc&limit=${limitDepartment}`)
    .then(response => {
      console.log(response.data)
      setCountByDepartment(response.data.aggregations);
      setLoadingDepartment(false);
    })
    .catch((error) => {
      setError(error);
    });
    // Fetch the number of events by city
    axios.get(`https://data.culture.gouv.fr/api/v2/catalog/datasets/liste-et-localisation-des-musees-de-france/aggregates?select=count(*)%20as%20count&group_by=ville&order_by=count(ville)desc&limit=${limitCity}`)
    .then(response => {
      console.log(response.data)
      setCountByCity(response.data.aggregations);
      setLoadingCity(false);
    })
    .catch((error) => {
      setError(error);
    });
  }, [limitDepartment, limitCity])

  const dataRegion = {
    labels: countByRegion.map(item => item.region),
    datasets: [
      {
        label: 'Nombre d\'évenement par région',
        backgroundColor: '#2E2E7A',
        borderColor: '#2E2E7A',
        borderWidth: 1,
        hoverBackgroundColor: '#EB6867',
        hoverBorderColor: '#EB6867',
        data: countByRegion.map(item => item.count)
      }
    ]
  };

  const dataDepartment = {
    labels: countByDepartment.map(item => item.departement),
    datasets: [
      {
        label: 'Nombre d\'évenement par département',
        backgroundColor: '#EB6867',
        borderColor: '#EB6867',
        borderWidth: 1,
        hoverBackgroundColor: '#2E2E7A',
        hoverBorderColor: '#2E2E7A',
        data: countByDepartment.map(item => item.count)
      }
    ]
  };

  const dataCity = {
    labels: countByCity.map(item => item.ville),
    datasets: [
      {
        label: 'Nombre d\'évenement par ville',
        backgroundColor: '#2E2E7A',
        borderColor: '#2E2E7A',
        borderWidth: 1,
        hoverBackgroundColor: '#EB6867',
        hoverBorderColor: '#EB6867',
        data: countByCity.map(item => item.count)
      }
    ]
  };

  const limitPoint = [ 
    { id: 1,
      limit: 5,
    },
    { id: 2,
      limit: 10,
    },
    { id: 3,
      limit: 20,
    },
    { id: 4,
      limit: 50,
    },
    { id: 5,
      limit: 100,
    },
    { id: 6,
      limit: 150,
    },
    { id: 7,
      limit: 200,
    },
  ];

  const changeLimitDep = (value) => {
    setLimitDepartment(value);
  }

  const changeLimitCity = (value) => {
    setLimitCity(value);
  }

  if(error) {
    return <> 
      <Error error={error}/> 
    </>
  }
    return (
      <NightWrapper>
        <StyledTitleImg>Nuit des musées 2018</StyledTitleImg>
          <StyledTitle>Nombre d'évenement par <span>région</span></StyledTitle>
          <div>
            {loadingRegion &&
              <Loader />}
            {!loadingRegion
            && <Bar data={dataRegion} width={1250} height={400} options={{ maintainAspectRatio: false }}/>}         
          </div>
          <StyledTitle>Nombre d'évenement par <span>département</span></StyledTitle>
          <SelectPoint handleChange={changeLimitDep} limitPoint={limitPoint} />
          <div>
            {loadingDepartment &&
              <Loader />}
            {!loadingDepartment &&
            <Bar data={dataDepartment} width={1250} height={400} options={{ maintainAspectRatio: false }}/>}
          </div>
          <StyledTitle>Nombre d'évenement par <span>ville</span></StyledTitle>
          <SelectPoint handleChange={changeLimitCity} limitPoint={limitPoint} />
          <div>
            {loadingCity &&
              <Loader />}
            {!loadingCity &&
            <Bar data={dataCity} width={1250} height={400} options={{ maintainAspectRatio: false }}/>}
          </div>
      </NightWrapper>
  );
}

export default NightMuseum;

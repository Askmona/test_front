import React, { useEffect, useState } from 'react';
import { MuseumAPI } from '../api/museum-api';
import { GeographicRepartition } from './geographic-repartition'
import { CountByLocation } from '../interfaces/count-by-location';
import styled from 'styled-components';

const GraphTitle = styled.h2`
    margin-left: 20px;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 40px;
`

export const MuseumNight: React.FC = () => {
    const [eventCountByCity, setEventCountByCity] = useState<CountByLocation[]>([])
    const [eventCountByDepartment, setEventCountByDepartment] = useState<CountByLocation[]>([])
    const [eventCountByRegion, setEventCountByRegion] = useState<CountByLocation[]>([])

    useEffect(() => {
        const citySubscription = MuseumAPI.getNightEventCountByCity().subscribe(res => {
            setEventCountByCity(res)
        })
        const departmentSubscription = MuseumAPI.getNightEventCountByDepartment().subscribe(res => {
            setEventCountByDepartment(res)
        })
        const regionSubscription = MuseumAPI.getNightEventCountByRegion().subscribe(res => {
            setEventCountByRegion(res)
        })
        return () => {
            citySubscription.unsubscribe();
            departmentSubscription.unsubscribe();
            regionSubscription.unsubscribe();
        }
    }, [])

    return (
        <section>
            <GraphTitle>Evénements par région</GraphTitle>
            <GeographicRepartition eventCountByLocation={eventCountByRegion} limit={20} />
            <GraphTitle>Evénements par département</GraphTitle>
            <GeographicRepartition eventCountByLocation={eventCountByDepartment} limit={20} />
            <GraphTitle>Evénements par ville</GraphTitle>
            <GeographicRepartition eventCountByLocation={eventCountByCity} limit={20} />
        </section>
    )
}


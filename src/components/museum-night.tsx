import React, { useEffect, useState } from 'react';
import { MuseumAPI } from '../api/museum-api';
import { GeographicRepartition } from './geographic-repartition'
import { CountByLocation } from '../interfaces/count-by-location';

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
            <h1>Nuit des musées 2018</h1>
            <h2>Nombre d'événements par région</h2>
            <GeographicRepartition eventCountByLocation={eventCountByRegion} limit={20} />
            <h2>Nombre d'événements par département</h2>
            <GeographicRepartition eventCountByLocation={eventCountByDepartment} limit={20} />
            <h2>Nombre d'événements par ville</h2>
            <GeographicRepartition eventCountByLocation={eventCountByCity} limit={20} />
        </section>
    )
}


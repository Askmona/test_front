import React, { RefObject, useEffect, useState } from 'react';
import { MuseumAPI } from '../api/museum-api';
import { GeographicRepartition } from './geographic-repartition'
import { CountByLocation } from '../interfaces/count-in-location';
export const MuseumNight: React.FC = () => {
    const [eventCountByCity, setEventCountByCity] = useState<CountByLocation[]>([])
    const [eventCountByDepartment, setEventCountByDepartment] = useState<CountByLocation[]>([])
    const [eventCountByRegion, setEventCountByRegion] = useState<CountByLocation[]>([])

    useEffect(() => {
        MuseumAPI.getNightEventCountByCity().subscribe(res => {
            setEventCountByCity(res)
        })
        MuseumAPI.getNightEventCountByDepartment().subscribe(res => {
            setEventCountByDepartment(res)
        })
        MuseumAPI.getNightEventCountByRegion().subscribe(res => {
            setEventCountByRegion(res)
        })
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


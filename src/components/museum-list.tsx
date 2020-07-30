import React, { useState, useEffect } from 'react';
import { Museum } from '../interfaces/museum';
import { MuseumAPI } from '../api/museum-api'
export const MuseumList: React.FC = () => {
    const [museums, setMuseums] = useState<Museum[]>([]);
    useEffect(() => {
        MuseumAPI.getMuseums().subscribe(museums => setMuseums(museums))
    }, [])
    return <ol>
        {museums.map(m => (
            <li>
                <h2>{m.nom_du_musee}</h2>
                <h3>{m.ville}</h3>
            </li>
        ))}
    </ol>
}


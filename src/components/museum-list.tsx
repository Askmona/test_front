import React, { useState, useEffect } from 'react';
import { Museum } from '../interfaces/museum';
import { MuseumAPI } from '../api/museum-api'
import { Link } from 'react-router-dom';
export const MuseumList: React.FC = () => {
    const [museums, setMuseums] = useState<Museum[]>([]);
    useEffect(() => {
        MuseumAPI.getMuseums().subscribe(museums => setMuseums(museums))
    }, [])
    return <ol>
        {museums.map(m => (
            <li key={m.ref_musee}>
                <Link to={`/museum/${m.ref_musee}`}>
                    <h2>{m.nom_du_musee}</h2>
                </Link>
                <h3>{m.ville}</h3>
            </li>
        ))}
    </ol>
}


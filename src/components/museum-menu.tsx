import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export const MuseumMenu: React.FC = () => {
    const location = useLocation();
    return (
        <nav>
            <Link to="/">
                Musées de France
            </Link>
            <Link to="/museum_night">
                Nuit des musées 2018
            </Link>
        </nav>

    )
}
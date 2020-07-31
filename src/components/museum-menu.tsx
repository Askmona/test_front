import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export const MuseumMenu: React.FC = () => {
    const location = useLocation();
    return (
        <nav>
            <Link to="/">
                <a key="/">
                    Musées de France
                </a>
            </Link>
            <Link to="/museum_night">
                <a key="/museum_night">
                    Nuit des musées 2018
            </a>
            </Link>
        </nav>

    )
}
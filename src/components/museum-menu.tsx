import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const NavItem = styled(Link) <{ active: string }>`
    display: inline-block;
    text-decoration: none;
    color : ${props => props.active === 'true' ? props.theme.color.primary : props.theme.color.textColor};
    padding: 20px;
    border-bottom: ${props => props.active === 'true' ? `2px solid ${props.theme.color.primary}` : `none`};
    
`
export const MuseumMenu: React.FC = () => {
    const location = useLocation()
    return (
        <nav>
            <NavItem active={location.pathname === '/' ? 'true' : 'false'} to="/">
                Musées de France
            </NavItem>
            <NavItem active={location.pathname === '/museum_night' ? 'true' : 'false'} to="/museum_night">
                Nuit des musées 2018
            </NavItem>
        </nav >

    )
}
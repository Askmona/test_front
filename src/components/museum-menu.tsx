import React from 'react'
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom'
export const MuseumMenu: React.FC = () => {
    let location = useLocation();
    return (
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/">
                <Link to="/">
                    Musées de France
        </Link>
            </Menu.Item>
            <Menu.Item key="/museum_night">
                <Link to="/museum_night">
                    Nuit des musées 2018
        </Link>
            </Menu.Item>
        </Menu>

    )
}
import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ ...props }) => {
    return (
        <>
            <h1>404 Not Found</h1>
            <p>Page introuvable...</p>
            <Link to='/'>Retour a l'accueil</Link>
        </>
    );
};

export default NotFound;
import React from "react";
import {
    Grid,
    Link,
    Typography,
    Divider,
} from "@material-ui/core";
import styled from "styled-components";

import ObjectRenderer from "components/ObjectRenderer.js";
import useMuseum from "hooks/api/useMuseum.js";
import AppContext from "contexts/AppContext.js";

const S = {};
S.Divider = styled(Divider)`
    margin-bottom: 1em;
`;
S.Grid = styled(Grid)`
    margin-top: 2em;
`;

const renderPre = pre => ([content]) => (
    <Typography
        variant="body1"
        gutterBottom
    >
        { pre }{ content }
    </Typography>
);
const SectionTitle = ({ children }) => (
    <Typography component="h4"
            variant="h6"
        >
            { children }
    </Typography>
);
const renderWithTitle = title => ([content]) => (
    <>
        <SectionTitle>{ title }</SectionTitle>
        { renderPre("")([content]) }
    </>
);
const renderInAnchor = children => ([href]) => (
    <Link
        variant="body1"
        href={"//" + href} target="_blank" rel="noopener noreferrer"
    >
        { children }
    </Link>
);

const MuseumRenderer = ({ museum }) => {
    const { Render } = ObjectRenderer;

    return (
        <ObjectRenderer value={museum}>
            <Typography component="h2"
                variant="h5"
            >    
                <Render paths="nom_du_musee" />
            </Typography>
            <Typography component="h3"
                variant="subtitle2"
            >
                <Render paths={["region", "departement"]}
                    render={Render.join(" / ")} />
            </Typography>
            <S.Divider />
            <Render paths="periode_ouverture" render={renderWithTitle("Ouvertures")}
                cond={Render.cond.allNonNil} />
            <Render paths="jours_nocturnes" render={renderWithTitle("Nocturnes")}
                cond={Render.cond.allNonNil} />
            <Render paths="fermeture_annuelle" render={renderWithTitle("Fermetures")}
                cond={Render.cond.allNonNil} />
            
            <SectionTitle>Contact</SectionTitle>
            <Typography
                variant="body1"
                gutterBottom
            >
                <Render paths={["adr", "cp", "ville"]} />
            </Typography>
            <Render paths="telephone1" render={renderPre("Tel: ")}
                cond={Render.cond.allNonNil} />
            <Render paths="fax" render={renderPre("Fax: ")}
                cond={Render.cond.allNonNil} />
            <Render paths="sitweb" render={renderInAnchor("Site Web")}
                cond={Render.cond.allNonNil} />
        </ObjectRenderer>
    );
};

const Museum = ({ ...props }) => {
    const { museumID } = props?.match?.params;
    const { museum, loading, error } = useMuseum(museumID);
    const { setTitle } = React.useContext(AppContext);

    setTitle("Musée");

    return (
        <>
            {(() => {
                if (loading)
                    return <p>Loading...</p>;
                if (error)
                    return <p>Unable to fetch museum details.</p>;
                return (
                    <S.Grid component="article" direction="column" container>
                        <MuseumRenderer museum={museum} />
                    </S.Grid>
                );
            })()}
        </>
    );
};

export default Museum;
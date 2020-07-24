import React from "react";
import {
    Link,
    useLocation,
} from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
} from "@material-ui/core";
import {
    Pagination,
    PaginationItem,
} from "@material-ui/lab";

import usePaginatedMuseums from "hooks/api/usePaginatedMuseums.js";
import AppContext from "contexts/AppContext.js";

const S = {};
S.PageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;
S.MuseumList = styled(List)`
    width: 100%;

    @media screen and (min-width: 70em) {
        max-width: 70em;
    }
`;

const renderMuseumListItem = ({ id, nom_du_musee, ville }) => {
    
    return (
        <ListItem
            key={id}
            button
            component={Link}
            to={`/museum/${id}`}
        >
            <ListItemText
                primary={nom_du_musee}
                secondary={ville}
            />
        </ListItem>
    );
};

const Home = () => {
    const location = useLocation();
    const { setTitle } = React.useContext(AppContext);
    const query = queryString.parse(location.search);
    const { museums, loading, error, page, count, pages } = usePaginatedMuseums({
        where: query.search ? `ville like "*${query.search}*"` : null,
        page: Number(query.page) || 1,
    });

    const getPageQuery = page => `?${queryString.stringify({
        search: query.search,
        page
    })}`;

    setTitle("Musées"); 

    const searchResultsCount = (() => {
        if (loading)
            return "Chargement..."
        if (error)
            return "Une erreur s'est produite."
        return `${count} musées`;
    })();

    return (
        <>
            <S.PageContent>
                <S.MuseumList subheader={
                    <ListSubheader>{ searchResultsCount }</ListSubheader>
                }>
                    {
                        !(loading || error)
                            ? museums.map(renderMuseumListItem)
                            : null
                    }
                </S.MuseumList>
                <Pagination
                    count={pages}
                    page={page}
                    disabled={loading || error}
                    renderItem={item => (
                        <PaginationItem
                            component={Link}
                            to={getPageQuery(item.page)}
                            replace
                            {...item}
                        />
                    )}
                />
            </S.PageContent>
        </>
    );
};

export default Home;
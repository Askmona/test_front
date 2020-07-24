import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import {
    Menu as MenuIcon,
}from "@material-ui/icons";
import styled from "styled-components";
import {
    useHistory,
    useLocation,
    Route,
    Link,
} from "react-router-dom";
import queryString from "query-string";

import SearchField from "components/SearchField.js"
import AppContext from "contexts/AppContext.js";

const S = {};
S.Toolbar = styled(Toolbar)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
S.ToolbarLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 1em;
`;
S.Drawer = styled(({ ...props }) => (
    <Drawer classes={{ root: "root" }} {...props} />
))`
    width: 50%;
`;

const AppHeader = () => {
    const history = useHistory();
    const location = useLocation();
    const query = queryString.parse(location.search);
    const [search, setSearch] = React.useState(query.search || "");
    const [menuOpen, setMenuOpen] = React.useState(false);
    const { title } = React.useContext(AppContext);
    const menuItems = [
        { title: "Musées", route: "/" },
        { title: "Nuit 2018", route: "/night2018" }
    ];

    const onSearch = e => {
        e.preventDefault();

        history.push({
            search: queryString.stringify({
                search,
                page: 1,
            }),
        });
    };

    return (
        <>
            <AppBar position="sticky">
                <S.Toolbar>
                    <S.ToolbarLeft>
                        <IconButton
                            aria-label="open drawer"
                            onClick={() => setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography noWrap variant="h6" component="h1">
                            { title }
                        </Typography>
                    </S.ToolbarLeft>
                    <Route exact path="/">
                        <form onSubmit={onSearch}>
                            <SearchField
                                name="search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </form>
                    </Route>
                </S.Toolbar>
            </AppBar>
            <S.Drawer
                open={menuOpen}
                onClick={() => setMenuOpen(false)}
            >
                <List>
                    {menuItems.map(({ title, route }) => (
                        <ListItem
                            button
                            key={title}
                            component={Link}
                            to={route}
                        >
                            <ListItemText
                                primary={title}
                            />
                        </ListItem>
                    ))}
                </List>
            </S.Drawer>
        </>
    );
};

export default AppHeader;
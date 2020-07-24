import React from "react";
import styled from "styled-components";
import {
    Input,
    InputAdornment,
} from "@material-ui/core";
import {
    Search as SearchIcon
}from "@material-ui/icons";

const SearchField = styled(({ ...props }) => (
    <Input
        classes={{ input: "input" }} {...props}
        autoComplete="off"
        disableUnderline={true}
        startAdornment={
            <InputAdornment
                classes={{ root: "adornment-root" }}
                position="start"
            >
                <SearchIcon classes={{ root: "icon-root" }} />
            </InputAdornment>
        }
    />
))`
    background-color: rgba(255, 255, 255, 0.15);
    color: #ccc;
    padding-left: 0.5em;
    border-radius: 0.1em;
    justify-self: flex-end;
    
    &.Mui-focused {
        background-color: rgba(255, 255, 255, 0.25);
        color: white;
    }

    .input {
        width: 12ch;
        transition: width 0.2s ease-in-out;
        &:focus {
            width: 18ch;
        }
    }

    .icon-root {
        fill: white;
    }
`;

export default SearchField;
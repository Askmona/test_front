import styled from "styled-components";

export const StyledButton = styled.button`
    border-radius: 0px;
    padding: 5px 15px;
    background-color: white;
    cursor: pointer;
    color : ${props => props.theme.color.secondary};
    border-color : ${props => props.theme.color.secondary};
    border: 3px solid;
    outline: none;
`
import styled from "styled-components";

export const StyledLi = styled.li`
background-color : white;
:not(:last-child){
    border-bottom : 1px solid ${props => props.theme.color.lightGray};
}
margin-top: 13px;
`

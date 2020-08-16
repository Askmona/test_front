import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mediaQueries } from '../../theme/index.js';

const InputWrapper = styled.form`
  display: flex;
  justify-content: center;
  width: 73%;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 4rem;
  ${mediaQueries('m')`
    flex-direction: column;
  `};
`

const Input = styled.input`
  font-family: "Poppins", Sans-serif;
  font-size: 1.2em;
  height: 35px;
  border-radius: 50px; 
  border: none; 
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  width: 50%;
  padding: 25px;
  color: rgba(64,84,178,1);
  :focus::-webkit-input-placeholder {
    color: rgba(64,84,178,1);
    transition: all .5s ease;
  }
  ${mediaQueries('m')`
    margin-bottom: 1rem;
  `};
  ${mediaQueries('s')`
    width: 100%;  
  `};
`;

const Button = styled.button`
  font-family: "Poppins", Sans-serif;
  font-weight: 500;
  line-height: 1em;
  letter-spacing: 0.7px;
  background: rgb(64,84,178);
  background: linear-gradient(90deg, rgba(64,84,178,1) 0%, rgba(47,47,123,1) 100%);
  border-radius: 50px 50px 50px 50px;
  padding: 18px 40px 18px 40px;
  border: none;
  color: #FFF;
  line-height: 1em;
  letter-spacing: 0.7px;
  font-size: 1.2em;
  transition: .3s;
  margin-left: 1rem;
  transition: .3s;
  :hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px 0 hsla(0,0%,47.1%,.3);
    transition: .3s;
  }
  ${mediaQueries('m')`
    margin: 0 auto;
  `};
  ${mediaQueries('xs')`
    width: 70%;
    padding: .8rem;
  `};
`;

const SearchBar = ({ value, handleChange, handleSubmit }) => (
    <InputWrapper action="submit" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Input
        type="text"
        placeholder="Recherche par ville"
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        />
        <Button type="submit" >Rechercher</Button>
    </InputWrapper>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SearchBar;

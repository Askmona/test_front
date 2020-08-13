import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`

const Input = styled.input`
  height: 35px;
  border-radius: 50px; 
  border: none; 
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
  width: 50%;
  padding: 25px;
  font-size: 1em;
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

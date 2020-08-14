import React from 'react';
import styled from 'styled-components';

const StyledLimitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  margin: 1rem;
  color: #8E8E8E;
`;

const StyledSelect = styled.select`
    padding: .8rem;
    margin-left: 1rem;
    font-size: 1.2rem;
    color: #8E8E8E;
    border: none;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.05);
    border-radius: 10px;
    :focus {
      outline: none;
    }
`;

const SelectPoint = ({ handleChange }) => {
  const limitPoint = [ 
    { id: 1,
      limit: 5,
    },
    { id: 2,
      limit: 10,
    },
    { id: 3,
      limit: 20,
    },
    { id: 4,
      limit: 50,
    },
    { id: 5,
      limit: 100,
    },
    { id: 6,
      limit: 150,
    },
    { id: 7,
      limit: 200,
    },
  ];

  return (
    <StyledLimitWrapper>
      <p>Nombre de points maximun</p>
        <StyledSelect
        name="list-supports"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        >
          <option>
            Sélectionnez
          </option>
          {limitPoint.map(point => (
            <option value={point.limit} key={point.id}>
              {point.limit}
            </option>
          ))}
        </StyledSelect>
    </StyledLimitWrapper>
  );
};

export default SelectPoint;

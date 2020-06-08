import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { GrUpdate } from 'react-icons/gr';
import Select from 'react-select';

const SelectBlock = styled.div`
  float: right;
  width: 200px;
`;
const options = [
  { value: 'date', label: '날짜순' },
  { value: 'name', label: '이름순' },
];
const NavBlock = styled.div`
  margin-top: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;
const StyledButton = styled(Button)`
  height: 2.125rem;
  background-color: white;
  border-radius: 0;
  color: black;
  &:hover {
    color: #22b8cf;
    background-color: white;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
`;

const CinemaNav = ({ onClickCinema, user, loading, onUpdate, onChange, onPush }) => {
  const [category, setcategory] = useState('cgv');
  const click = (e) => {
    e.preventDefault();
    setcategory(e.target.value);
    onClickCinema(e.target.value);
  };
  return (
    <NavBlock>
      <StyledButton
        className={category === 'cgv' ? 'active' : ''}
        onClick={click}
        value="cgv"
      >
        CGV
      </StyledButton>
      <StyledButton
        className={category === 'megabox' ? 'active' : ''}
        onClick={click}
        value="megabox"
      >
        MEGABOX
      </StyledButton>
      <StyledButton
        className={category === 'lotte' ? 'active' : ''}
        onClick={click}
        value="lotte"
      >
        LOTTE
      </StyledButton>
      {user
        ? user.username === 'admin' && (
            <>
              <StyledButton onClick={onUpdate} cyan>
                UPDATE
              </StyledButton>
              <StyledButton onClick={onPush} cyan>
                PUSH
              </StyledButton>
            </>
          )
        : ''}
      {loading && (
        <>
          <span> </span>
          <GrUpdate /> 진행중...
        </>
      )}
      <SelectBlock>
        <Select options={options} onChange={onChange}></Select>
      </SelectBlock>
    </NavBlock>
  );
};

export default CinemaNav;

import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const HoverButton = styled(Button)`
  width: 80%;
`;
const CinemaListBlock = styled(Responsive)`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
const CinemaItemBlock = styled.div`
  width: calc(100% / 4);
  margin-bottom: 1rem;
  color: ${palette.gray[8]};
  font-weight: bold;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: ${palette.cyan[7]};
  }
  img {
    width: 80%;
    height: 282.71px;
  }
  p:nth-child(1) {
    width: 80%;
    height: 30px;
  }
`;

const CinemaImg = ({ item, onAlarm, user }) => {
  const { img, link } = item;
  const onClick = (e) => {
    e.preventDefault();
    onAlarm(item);
  };

  let hasId = [];
  if (user && user.alarm != null) {
    hasId = user.alarm.map((Object) => Object._id.includes(item._id));
  }
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={img} alt="" />
        {user && hasId.includes(true) ? (
          <HoverButton onClick={onClick} cyan>
            신청완료
          </HoverButton>
        ) : (
          <HoverButton onClick={onClick}>알람신청</HoverButton>
        )}
      </a>
    </>
  );
};

const CiemaItem = ({ item, onAlarm, user }) => {
  const { movies, days } = item;
  return (
    <>
      {movies && (
        <CinemaItemBlock>
          <p>{movies}</p>
          <p>{days}</p>
          <CinemaImg item={item} onAlarm={onAlarm} user={user}></CinemaImg>
        </CinemaItemBlock>
      )}
    </>
  );
};

const CinemaList = ({ movies, user, onAlarm }) => {
  return (
    <CinemaListBlock>
      {movies &&
        movies.map((item) => (
          <CiemaItem item={item} key={item._id} user={user} onAlarm={onAlarm} />
        ))}
    </CinemaListBlock>
  );
};

export default CinemaList;

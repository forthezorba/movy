import React, { useEffect, useCallback } from 'react';
import Responsive from '../../components/common/Responsive';
import styled from 'styled-components';
import CinemaNav from '../../components/movie/CinemaNav';
import CinemaList from '../../components/movie/CinemaList';
import { useDispatch, useSelector } from 'react-redux';
import { getListByCinema } from '../../modules/cinema';
import { crawlUpdate } from '../../modules/update';
import { insertAlarm } from '../../modules/alarm';
import { pushAlarm } from '../../modules/push';
import { check } from '../../modules/user';

const Wrapper = styled(Responsive)`
  align-items: center;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const CinemaNavContainer = () => {
  const dispatch = useDispatch();
  const { movies, user, loading, selectedCinema, token } = useSelector(
    ({ list, user, loading, token }) => ({
      movies: list.movies,
      selectedCinema: list.selectedCinema,
      user: user.user,
      token: token.token,
      loading: loading['crawl/UPDATE_LIST'],
    }),
  );
  useEffect(() => {
    dispatch(getListByCinema({ cinema: 'cgv' }));
  }, [dispatch]);

  const onClickCinema = useCallback(
    (cinema) => {
      dispatch(getListByCinema({ cinema }));
    },
    [dispatch],
  );
  //크롤링 update버튼
  const onUpdate = useCallback(() => {
    try {
      dispatch(crawlUpdate());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  //selectbox값변경
  const onChange = useCallback(
    (filter) => {
      let cinema = selectedCinema;
      dispatch(getListByCinema({ cinema, filter }));
    },
    [dispatch, selectedCinema],
  );
  //알람신청하기
  const onAlarm = useCallback(
    async (item) => {
      if (user === null) {
        alert('로그인 해주세요');
        return;
      }
      if (window.confirm('알람을 받으시겠습니까?')) {
        dispatch(insertAlarm({ token, user, item }));
        setTimeout(() => {
          dispatch(check());
        }, 1000);
      }
    },
    [dispatch, token, user],
  );

  //push알람 보내기
  const onPush = useCallback(() => {
    dispatch(pushAlarm());
  }, [dispatch]);

  return (
    <Wrapper>
      <CinemaNav
        onClickCinema={onClickCinema}
        user={user}
        loading={loading}
        onUpdate={onUpdate}
        onChange={onChange}
        onPush={onPush}
      />
      <CinemaList movies={movies} user={user} onAlarm={onAlarm}></CinemaList>
    </Wrapper>
  );
};

export default CinemaNavContainer;

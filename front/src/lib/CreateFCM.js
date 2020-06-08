 import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fcm from '../fcm';
import firebase from 'firebase';
import { insertToken } from '../modules/alarm';

function CreateFCM (){
  console.log('랜더링')
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('useEffect inserToken');
    firebase.initializeApp(fcm.config);
    const messaging = firebase.messaging();
    let token = '';
    messaging
      .requestPermission()
      .then(function () {
        console.log('허가!');
        token = messaging.getToken();
        return token; //토큰을 받는 함수를 추가!
      })
      .then(function (token) {
        console.log(token); //토큰을 출력!
        dispatch(insertToken(token));
      })
      .catch(function (err) {
        console.log('fcm에러 : ', err);
      });
    messaging.onTokenRefresh(function () {
      messaging
        .getToken()
        .then(function (refreshedToken) {
          insertToken(refreshedToken); //토큰이 재 생성될 경우 다시 저장
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
    messaging.onMessage(function (payload) {
      alert(
        'Got a ' +
          payload.notification.title +
          '\n' +
          payload.notification.body,
      );
    });
  }, [dispatch]);
  return <div></div>;
};

export default React.memo(CreateFCM);
 


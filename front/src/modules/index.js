import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import list,{ listSaga } from './cinema';
import token,{ tokenSaga } from './alarm';
import push,{ PushSaga } from './push';
import update, { UpdateSaga } from './update';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  list,
  token,
  push,
  update
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(),listSaga(),tokenSaga(),PushSaga(),UpdateSaga()]);
}

export default rootReducer;

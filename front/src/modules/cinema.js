import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as API from '../lib/api/movie';
import { takeLatest } from 'redux-saga/effects';

const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes(
  'cinema/LIST',
);

export const getListByCinema = createAction(LIST, ({cinema, filter}) => ({cinema, filter}));

const createListSaga = createRequestSaga(LIST, API.getListByCinema);

export function* listSaga() {
  yield takeLatest(LIST, createListSaga);
}

const initialState = {
  movies: null,
  error: null,
  selectedCinema: null, //필터추가
};

const list = handleActions(
  {
    [LIST_SUCCESS]: (state, { payload: {arr, cinema} }) => ({
      ...state,
      selectedCinema: cinema,
      movies: arr,
    }),
    [LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default list;

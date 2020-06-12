import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchMovies(action) {

  try {
    const response = yield fetch(`http://www.omdbapi.com/?s=${action.payload}&apikey=d1262879`).then(response => response.json());
    yield put({ type: "GET_MOVIES_SUCCESS", payload: response.Search });
  } catch (error) {
    yield put({ type: "GET_MOVIES_FAILURE", payload: error })
  }
}

function* fetchMovieDetails(action) {

  try {
    const response = yield fetch(`http://www.omdbapi.com/?i=${action.payload}&plot=full&apikey=d1262879`).then(response => response.json());
    yield put({ type: "GET_MOVIES_DETAIL_SUCCESS", payload: response });
  } catch (error) {
    yield put({ type: "GET_MOVIES_DETAIL_FAILURE", payload: error })
  }
}

function* actionWatcher() {
  yield takeLatest('GET_MOVIES', fetchMovies);
  yield takeLatest('GET_MOVIES_DETAIL', fetchMovieDetails)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
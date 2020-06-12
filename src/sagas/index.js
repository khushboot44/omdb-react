import { put, takeLatest, all, debounce } from "redux-saga/effects";
import config from "../config/config";

function* fetchMovies(action) {
  try {
    const response = yield fetch(
      `${config.API_END_POINT}?s=${action.payload}&apikey=${config.API_KEY}`
    ).then(response => response.json());
    yield put({ type: "GET_MOVIES_SUCCESS", payload: response.Search });
  } catch (error) {
    yield put({ type: "GET_MOVIES_FAILURE", payload: error });
  }
}

function* fetchMovieDetails(action) {
  try {
    const response = yield fetch(
      `${config.API_END_POINT}?i=${action.payload}&plot=full&apikey=${config.API_KEY}`
    ).then(response => response.json());
    yield put({ type: "GET_MOVIES_DETAIL_SUCCESS", payload: response });
  } catch (error) {
    yield put({ type: "GET_MOVIES_DETAIL_FAILURE", payload: error });
  }
}

function* actionWatcher() {
  yield debounce(1000, "GET_MOVIES", fetchMovies);
  yield takeLatest("GET_MOVIES_DETAIL", fetchMovieDetails);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

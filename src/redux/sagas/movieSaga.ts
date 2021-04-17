import { put, call, takeLatest } from 'redux-saga/effects'

import axios, { AxiosResponse } from 'axios'

import { FilmActionType, FilmMovieActions } from '../actions'
import { SearchResults, MoviesDetail } from '../types'

function* fetchMovies({
  payload,
}: ReturnType<typeof FilmMovieActions.fetchMovies>) {
  try {
    const { data }: AxiosResponse<SearchResults> = yield call(
      axios.get,
      `https://www.omdbapi.com/?s=${payload.search}&apikey=591dc16c`
    )
    if (data.Response === 'FETCH_MOVIE_ERROR') {
      yield put(FilmMovieActions.fetchMovieError(data.Error))
    }
    yield put(FilmMovieActions.fetchMoviesSuccess(data.Search))
  } catch (e) {
    yield put(FilmMovieActions.fetchMovieError(e))
  }
}

function* fetchMovie({
  payload,
}: ReturnType<typeof FilmMovieActions.fetchMovie>) {
  try {
    const { data }: AxiosResponse<MoviesDetail> = yield call(
      axios.get,
      `https://www.omdbapi.com/?i=${payload.id}&apikey=591dc16c`
    )
    yield put(FilmMovieActions.fetchMovieSuccess(data))
  } catch (e) {
    yield put(FilmMovieActions.fetchMovieError(e))
  }
}

function* movieSaga() {
  yield takeLatest(FilmActionType.FETCH_MOVIES, fetchMovies)
  yield takeLatest(FilmActionType.FETCH_MOVIE, fetchMovie)
}

export default movieSaga

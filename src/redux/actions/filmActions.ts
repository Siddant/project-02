import { Action } from 'redux'
import { createAction } from 'redux-actions'

import { FilmState } from '../types'

export enum FilmActionType {
  FETCH_MOVIES = 'FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIE = 'FETCH_MOVIE',
  FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS',
  FETCH_MOVIE_ERROR = 'FETCH_MOVIE_ERROR',
}

interface FetchMoviesAction extends Action<typeof FilmActionType.FETCH_MOVIES> {
  payload: {
    search: string
  }
}
interface FetchMoviesSuccessAction
  extends Action<typeof FilmActionType.FETCH_MOVIES_SUCCESS> {
  payload: {
    results: FilmState['results']
  }
}

interface FetchMovieAction extends Action<typeof FilmActionType.FETCH_MOVIE> {
  payload: {
    id: string
  }
}

interface FetchMovieSuccessAction
  extends Action<typeof FilmActionType.FETCH_MOVIE_SUCCESS> {
  payload: {
    movie: FilmState['movie']
  }
}

interface FetchMovieErrorAction
  extends Action<typeof FilmActionType.FETCH_MOVIE_ERROR> {
  payload: {
    error: FilmState['error']
  }
}

export type FilmActionsType =
  | FetchMoviesAction
  | FetchMoviesSuccessAction
  | FetchMovieErrorAction
  | FetchMovieSuccessAction
  | FetchMovieAction

const fetchMovies = createAction(
  FilmActionType.FETCH_MOVIES,
  (search: string) => ({
    search,
  })
)

const fetchMoviesSuccess = createAction(
  FilmActionType.FETCH_MOVIES_SUCCESS,
  (results: FilmState['results']) => {
    return { results }
  }
)

const fetchMovie = createAction(FilmActionType.FETCH_MOVIE, (id: string) => ({
  id,
}))

const fetchMovieSuccess = createAction(
  FilmActionType.FETCH_MOVIE_SUCCESS,
  (movie: FilmState['movie']) => ({ movie })
)

const fetchMovieError = createAction(
  FilmActionType.FETCH_MOVIE_ERROR,
  (error: FilmState['error']) => ({ error })
)

export const FilmMovieActions = {
  fetchMovies,
  fetchMoviesSuccess,
  fetchMovieSuccess,
  fetchMovieError,
  fetchMovie,
}

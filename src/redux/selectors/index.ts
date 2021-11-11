import { createSelector, Selector } from 'reselect'

import { RootState } from '../store'
import { MoviesDetail, FilmState } from '../types'

const root = (state: RootState): FilmState => state.movies

export const getListOfMovies: Selector<RootState, MoviesDetail[]> =
  createSelector(root, movies => movies.results)

export const getError: Selector<RootState, Error | undefined> = createSelector(
  root,
  movies => movies.error
)

export const getSelectedMovies: Selector<RootState, MoviesDetail | undefined> =
  createSelector(root, movies => movies.movie)

import { FilmActionsType, FilmActionType } from '../actions'
import { FilmState } from '../types'

const initialState: FilmState = {
  results: [],
  movie: undefined,
  error: undefined,
}

const movies = (
  state: FilmState = initialState,
  action: FilmActionsType
): FilmState => {
  switch (action.type) {
    case FilmActionType.FETCH_MOVIES:
      return { ...state }
    case FilmActionType.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        results: action.payload.results,
      }
    case FilmActionType.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload.movie,
      }
    case FilmActionType.FETCH_MOVIE_ERROR:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

export default movies

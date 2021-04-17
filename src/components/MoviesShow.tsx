import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface MoviesDetail {
  Title: string
  Year: string
  imdbRating: string
  Metascore: string
  Poster: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  BoxOffice: string
}

interface State {
  search: string
  movie?: MoviesDetail
  error?: Error
}

interface ParamsProps {
  id: string
}

const initialState: State = {
  search: '',
  movie: undefined,
  error: undefined,
}

interface Action<T> {
  type: T
}

interface SearchMovie extends Action<'SEARCH_MOVIE'> {
  payload: {
    search: State['search']
  }
}
interface FetchMovieSuccess extends Action<'FETCH_MOVIE_SUCCESS'> {
  payload: {
    movie: State['movie']
  }
}

interface FetchMovieError extends Action<'FETCH_MOVIE_ERROR'> {
  payload: {
    error: State['error']
  }
}

type ActionType = SearchMovie | FetchMovieSuccess | FetchMovieError

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'SEARCH_MOVIE':
      return { ...state, search: action.payload.search }
    case 'FETCH_MOVIE_SUCCESS':
      return { ...state, movie: action.payload.movie }
    case 'FETCH_MOVIE_ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

const MoviesShow: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const params = useParams<ParamsProps>()

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${params.id}&apikey=591dc16c`)
      .then(res =>
        dispatch({
          type: 'FETCH_MOVIE_SUCCESS',
          payload: { movie: res.data },
        })
      )
      .catch(err =>
        dispatch({ type: 'FETCH_MOVIE_ERROR', payload: { error: err } })
      )
  }, [params.id])

  if (!state.movie) return null

  const {
    Title,
    Year,
    imdbRating,
    Metascore,
    Poster,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    BoxOffice,
  } = state.movie

  return (
    <div className="section">
      <div className="container">
        <h1 className="title is-1">
          {Title} <span>({Year})</span>
        </h1>
        <div className="scores">
          <p>
            <strong>Imdb Rating:</strong> {imdbRating}{' '}
            <strong>Metascore:</strong> {Metascore}
          </p>
        </div>
        <div className="columns">
          <div className="column poster">
            <figure className="image">
              <img src={Poster} alt={Title} />
            </figure>
          </div>
          <div className="column">
            <p>
              <strong>Runtime:</strong> {Runtime}
            </p>
            <p>
              <strong>Genre:</strong> {Genre}
            </p>
            <p>
              <strong>Director:</strong> {Director}
            </p>
            <p>
              <strong>Writer:</strong> {Writer}
            </p>
            <p>
              <strong>Actors:</strong> {Actors}
            </p>
            <p>
              <strong>Plot:</strong> {Plot}
            </p>
            <p>
              <strong>Language:</strong> {Language}
            </p>
            <p>
              <strong>Country:</strong> {Country}
            </p>
            <p>
              <strong>BoxOffice:</strong> {BoxOffice}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesShow

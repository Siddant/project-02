import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'

import SearchResults from './SearchResults'

const apikey = process.env.apiToken

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
  imdbID: string
}

interface State {
  searched: string
  search: string
  results: MoviesDetail[]
  error?: Error
}

interface ParamsProps {
  id: string
}

const initialState: State = {
  searched: 'star',
  search: '',
  results: [],
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
    results: State['results']
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
      return { ...state, search: action.payload?.search }
    case 'FETCH_MOVIE_SUCCESS':
      return {
        ...state,
        results: action.payload?.results,
        searched: state.search,
      }
    case 'FETCH_MOVIE_ERROR':
      return { ...state, error: action.payload.error, searched: state.search }
    default:
      return state
  }
}

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios
      .get('https://www.omdbapi.com/?s=star&apikey=591dc16c')
      .then(({ data }) => {
        dispatch({
          type: 'FETCH_MOVIE_SUCCESS',
          payload: { results: data.Search },
        })
      })
  }, [])

  const apiCall = () => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${state.search}&type=movie&apikey=591dc16c`
      )
      .then(({ data }) => {
        if (data.Response === 'True') {
          dispatch({
            type: 'FETCH_MOVIE_SUCCESS',
            payload: { results: data.results },
          })
        } else
          dispatch({
            type: 'FETCH_MOVIE_ERROR',
            payload: { error: data.Error },
          })
      })
  }

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SEARCH_MOVIE',
      payload: { search: value },
    })
    debounce(apiCall, 1000)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="search">
                Search for movie
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search for movie"
                    name="search"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title is-1">
            Movies with {state.searched} in their title
          </h2>

          <div className="columns is-multiline">
            {state.results.length > 0 &&
              state.results.map((result: MoviesDetail) => (
                <div className="column is-one-fifth" key={result.imdbID}>
                  <SearchResults {...result} />
                </div>
              ))}
            <div className="column">
              <p>{state.error}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

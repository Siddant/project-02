import React, { useEffect, useState, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'

import SearchResults from './SearchResults'
import { FilmMovieActions, getListOfMovies, getError } from '../redux'

const apikey = process.env.apiToken

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('star')
  const results = useSelector(getListOfMovies)
  const error = useSelector(getError)

  useEffect(() => {
    apiCall(search)
  }, [])

  const apiCall = (search: string) => {
    dispatch(FilmMovieActions.fetchMovies(search))
  }

  const debounceFunction = useRef(
    debounce((search: string) => apiCall(search), 1000)
  )

  useEffect(() => {
    debounceFunction.current(search)
  }, [search])

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value)
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
          <h2 className="title is-1">Movies with {search} in their title</h2>

          <div className="columns is-multiline">
            {results.length > 0 &&
              results.map(result => (
                <div className="column is-one-fifth" key={result.imdbID}>
                  <SearchResults {...result} />
                </div>
              ))}
            <div className="column">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

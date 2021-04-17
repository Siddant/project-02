import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FilmMovieActions, getSelectedMovies } from '../redux'

interface ParamsProps {
  id: string
}

const MoviesShow: React.FC = () => {
  const params = useParams<ParamsProps>()
  const dispatch = useDispatch()
  const movie = useSelector(getSelectedMovies)

  useEffect(() => {
    dispatch(FilmMovieActions.fetchMovie(params.id))
  }, [])

  if (!movie) return null

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
  } = movie

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

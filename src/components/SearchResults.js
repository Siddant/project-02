import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ Poster, Title, Year, imdbID }) => {
  return (
    <div className="card">
      <Link to={`/movies/${imdbID}`}>
        <div className="card-header">
          <h2 className="card-header-title">{Title}</h2>
        </div>

        <div className="card-image">
          <figure className="image" style={{ backgroundImage: `url(${Poster})` }} />
        </div>

        <div className="card-content">
          <div className="content">
            <p><strong>Year:</strong> {Year}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchResult

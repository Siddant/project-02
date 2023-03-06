import React from 'react'

interface Props {
  handleChange: () => void
  handleSubmit: () => void
}

const Search: React.FC<Props> = ({ handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="search-movie">
          Search for movie
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search for movie"
              name="search"
              onChange={handleChange}
              id="search-movie"
            />
          </div>
        </label>
      </div>

      <button className="button">Search </button>
    </form>
  )
}

export default Search

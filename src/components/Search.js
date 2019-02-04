import React from 'react'

const Search = ({ handleChange, handleSubmit}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Search for movie</label>
        <div className="control">
          <input className="input" type="text" placeholder="Search for movie" name="search" onChange={handleChange}/>
        </div>
      </div>

      <button className="button" >Search </button>
    </form>
  )
}

export default Search

export interface MoviesDetail {
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

export interface FilmState {
  results: MoviesDetail[]
  movie?: MoviesDetail
  error?: Error
}

export interface SearchResults {
  Response: string
  Search: MoviesDetail[]
  totalResults: string
  Error: Error
}

// export interface SearchMovieResults extends Omit<SearchResults, 'Search'> {
//   Search: MoviesDetail
// }

import React, { useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchMovieHandler() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://swapi.dev/api/films')
      if (!response.ok) throw new Error('Something went wrong.')

      const data = await response.json()

      const moviesArray = data.results.map(movie => ({
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl
      }))

      setMovies(moviesArray)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  let content = <p>No movies :(</p>
  if (error) content = <p>{error}</p>
  if (movies.length > 0) content = <MoviesList movies={movies} />
  if (isLoading) content = <p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App

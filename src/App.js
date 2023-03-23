import React, { useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])

  async function fetchMovieHandler() {
    fetch('https://swapi.dev/api/films')
      .then(res => res.json())
      .then(movies => {
        const newMoviesArray = movies.results.map(movie => ({
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl
        }))
        setMovies(newMoviesArray)
      })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  )
}

export default App

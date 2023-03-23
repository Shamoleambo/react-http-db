import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'https://react-academind-3054e-default-rtdb.firebaseio.com/movies.json'
      )
      if (!response.ok) throw new Error('Something went wrong.')

      const data = await response.json()
      let moviesArray = []

      for (let key in data) {
        moviesArray.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(moviesArray)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])

  async function addMovieHandler(movie) {
    const response = await fetch(
      'https://react-academind-3054e-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/josn' }
      }
    )

    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  let content = <p>No movies :(</p>
  if (error) content = <p>{error}</p>
  if (movies.length > 0) content = <MoviesList movies={movies} />
  if (isLoading) content = <p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App

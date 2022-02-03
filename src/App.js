import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [ movies, setMovies ] = useState([])
  const [ isLoading, setisLoading ] = useState(false)
  const [ feedback, setFeedback ] = useState('No movies yet')
  
  const transformData = (data) => {
    return data.map(film => {
      return {
        id: film.episode_id,
        title: film.title,
        openingText: film.opening_crawl,
        releaseDate: film.release_date,
      }
    })
  }

  const fetchMovies = async () => {
    try {
      setisLoading(true)
      const response = await fetch('https://swapi.dev/api/films')
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const res = await response.json()
      setMovies(transformData(res.results))
      setFeedback(null)
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        { isLoading && <p>Loading...</p> }
        { !isLoading && movies.length > 0 && <MoviesList movies={movies} /> }
        { !isLoading && movies.length === 0 && <p>{ feedback }</p> }
      </section>
    </React.Fragment>
  );
}

export default App;

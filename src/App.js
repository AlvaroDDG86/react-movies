import React, { useCallback, useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [ movies, setMovies ] = useState([])
  const [ isLoading, setisLoading ] = useState(false)
  const [ feedback, setFeedback ] = useState('No movies yet')
  
  const transformData = (data) => {
    return Object.keys(data).map(film => ({
      id: film,
      title: data[film].title,
      openingText: data[film].openingText,
      releaseDate: data[film].releaseDate,
    }))
  }

  // useCallback is necesary for avoid reload the component forever
  const fetchMovies = useCallback(async () => {
    try {
      setisLoading(true)
      const response = await fetch('https://react-movies-be772-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const res = await response.json()
      setMovies(transformData(res))
      setFeedback(null)
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setisLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies]) // this is a good practice

  const addMovieHandler = async (movie) => {
    const result = await fetch('https://react-movies-be772-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json'
      }
    })
    await result.json()
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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

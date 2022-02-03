import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [ movies, setMovies ] = useState([])
  
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

  const fetchMovies = () => {
    fetch('https://swapi.dev/api/films').then(res => res.json()).then(res => {
      setMovies(transformData(res.results))
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

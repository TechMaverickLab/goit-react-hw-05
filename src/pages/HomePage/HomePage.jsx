import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import useNavigation from '../../contexts/useNavigation';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const { setPrevPath } = useNavigation();

  useEffect(() => {
    setPrevPath('/'); // Зберігаємо поточний шлях

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '9004b6bfed6168d78cc5bc3b7fe243c3',
            language: 'en-US',
            page: 1
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [setPrevPath]);

  return (
    <div className="mainContent">
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Movies</h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default HomePage;

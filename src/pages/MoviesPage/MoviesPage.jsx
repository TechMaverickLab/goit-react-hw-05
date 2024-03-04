import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './MoviesPage.module.css';
import useNavigation from '../../contexts/useNavigation';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const { setPrevPath } = useNavigation();

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: '9004b6bfed6168d78cc5bc3b7fe243c3',
            language: 'en-US',
            query: searchQuery,
            page: 1,
            include_adult: false
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchParams({ query });
    setSearchQuery(query);
    setPrevPath(`/movies?query=${query}`);
  };

  return (
    <div className="mainContent">
      <div className={styles.container}>
        <SearchBar onSubmit={handleSearch} initialValue={searchQuery} />
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          searchQuery && <p className="noMovies">No movies found.</p>
        )}
      </div>
    </div>
  );
  
}

export default MoviesPage;

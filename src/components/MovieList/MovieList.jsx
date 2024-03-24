import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom'; 
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation(); 

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder_for_movies.webp'}
              alt={movie.title}
              className={styles.image}
            />
            <p className={styles.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;

import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder_for_movies.webp';

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={movie.title} className={styles.image} />
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;

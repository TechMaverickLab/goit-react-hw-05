import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import useNavigation from '../../contexts/useNavigation';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { prevPath } = useNavigation();


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9004b6bfed6168d78cc5bc3b7fe243c3`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleBackClick = () => {
    navigate(prevPath || '/');
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className={styles.movieDetails}>
      <div className={styles.columns}>
        <div className={styles.leftColumn}>
          <div className={styles.leftTop}>
            <button onClick={handleBackClick}>Back</button>
            <img src={imageUrl} alt={movie.title} className={styles.movieImage} />
          </div>
          <div className={styles.additionalInfo}>
            <h3>Additional Information</h3>
            <div className={styles.additionalLinks}>
              <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.rightTop}>
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <div className={styles.section}>
              <h3>Overview</h3>
              <p className={styles.sectionContent}>{movie.overview}</p>
            </div>
            <div className={styles.section}>
              <h3>Genres</h3>
              <ul className={styles.sectionContent}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
     
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

MovieDetailsPage.propTypes = {
  prevPath: PropTypes.string.isRequired,
};

export default MovieDetailsPage;

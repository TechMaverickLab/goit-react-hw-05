import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9004b6bfed6168d78cc5bc3b7fe243c3`);
        setCast(response.data.cast);
      } catch (error) {
        setError('Failed to fetch cast');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <ul className={styles.list}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.item}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : '/gender_neutral_placeholder.webp'}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p className={styles.name}>{actor.name}</p>
            <p className={styles.character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default MovieCast;

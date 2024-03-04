import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          params: {
            api_key: '9004b6bfed6168d78cc5bc3b7fe243c3',
            language: 'en-US',
            page: 1
          }
        });
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (!reviews.length) {
    return <div>No reviews found.</div>;
  }

  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.review}>
          <h4 className={styles.author}>{review.author}</h4>
          <p className={styles.content}>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieReviews;

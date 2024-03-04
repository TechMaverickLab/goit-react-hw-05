import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

function SearchBar({ onSubmit, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

export default SearchBar;

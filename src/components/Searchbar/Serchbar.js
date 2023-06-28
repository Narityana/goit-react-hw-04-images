import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa';

import PropTypes from 'prop-types';
import css from './Serchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSerchQuery] = useState('');

  const onInput = event => {
    setSerchQuery(event.currentTarget.value.toLowerCase().trim());
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSerchQuery('');
    event.currentTarget.reset();
  };

  return (
    <header className={css.searchbar__container}>
      <form className={css.searchbar__form} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.searchbar__button}>
          <FaSistrix className={css.searchbar__icon} />
        </button>

        <input
          className={css.searchbar__input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onInput={onInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

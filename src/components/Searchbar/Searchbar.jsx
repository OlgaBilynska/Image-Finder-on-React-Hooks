import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import SearchForm from 'components/SearchForm/SearchForm';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  // state = {
  //   query: '',
  // };

  const handleNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return toast.error('Choose a category');
    }

    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <SearchForm
        onChange={handleNameChange}
        onFormSubmit={handleSubmit}
        value={query}
      />
    </header>
  );
}

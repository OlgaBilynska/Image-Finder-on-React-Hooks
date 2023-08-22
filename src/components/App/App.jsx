import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageInfo from '../ImageInfo/ImageInfo';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageInfo query={query} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import ImageErrorView from 'components/ImageErrorView/ImageErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import api from 'services/pixabay-api';
import css from './ImageInfo.module.css';
import PropTypes from 'prop-types';

export default function ImageInfo({ query }) {
  const [images, setImages] = useState(null);
  // const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    setStatus('pending');
    api
      .fetchFirstImages(query)
      .then(({ hits }) => {
        if (hits.length === 0) {
          throw Error(query);
        }
        setImages(hits);
        setStatus('resolved');
        return;
      })
      .catch(error => {
        // setError(error);
        setStatus('rejected');
      });
  }, [query]);

  const onPageChange = () => {
    setPage(prevPage => prevPage + 1);
    api
      .fetchLoadMore(query, page + 1)
      .then(({ hits }) => {
        if (hits.length < 12) {
          toast('These are all the images by the category.');
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setStatus('resolved');
      })
      .catch(error => {
        // setError(error);
        setStatus('rejected');
      });
  };

  const statusBehaviour = status => {
    switch (status) {
      case 'idle':
        return <div className={css.choice}>Choose an image category here</div>;

      case 'pending':
        return <Loader />;

      case 'rejected':
        return <ImageErrorView query={query} />;

      case 'resolved':
        return (
          <div className={css.resultMarkUp}>
            <ImageGallery hits={images} />
            <Button onClick={onPageChange} />
          </div>
        );

      default:
        return null;
    }
  };

  return statusBehaviour(status);
}

ImageInfo.propTypes = {
  query: PropTypes.string,
};

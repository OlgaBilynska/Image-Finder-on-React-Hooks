import { useState, useEffect } from 'react';
import ImageErrorView from 'components/ImageErrorView/ImageErrorView';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import api from 'services/pixabay-api';
import css from './ImageInfo.module.css';

export default function ImageInfo({ query }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  // const [query, setQuery] = useState(query);

  // state = {
  //   images: null,
  //   error: null,
  //   status: 'idle',
  //   page: 1,
  // };

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
        setError(error);
        setStatus('rejected');
      });
  }, [query]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevProps.query;
  //   const nextQuery = this.props.query;

  //   if (prevQuery !== nextQuery) {
  //     this.setState({ page: 1 });
  //     this.setState({ status: 'pending' });
  //     api
  //       .fetchFirstImages(nextQuery)
  //       .then(({ hits }) => {
  //         if (hits.length === 0) {
  //           throw Error(nextQuery);
  //         }
  //         this.setState({ images: hits, status: 'resolved' });
  //         return;
  //       })
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   }
  // }

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
        setError(error);
        setStatus('rejected');
      });
  };

  const statusBehaviour = status => {
        switch (status) {
      case 'idle':
        return <div className={css.choice}>Choose an image category here</div>;
      // break;

      case 'pending':
        return <Loader />;
      // break;

      case 'rejected':
        return <ImageErrorView query={query} />;
      // break;

      case 'resolved':
        return (
          <div className={css.resultMarkUp}>
            <ImageGallery hits={images} />
            <Button onClick={onPageChange} />
          </div>
        );
      // break;

      default:
        return null;
    }
  };

  return statusBehaviour(status);

  // if (status === 'idle') {
  //   return <div className={css.choice}>Choose an image category here</div>;
  // }

  // if (status === 'pending') {
  //   return <Loader />;
  // }

  // if (status === 'rejected') {
  //   return <ImageErrorView query={query} />;
  // }

  // if (status === 'resolved') {
  //   return (
  //     <div className={css.resultMarkUp}>
  //       <ImageGallery hits={images} />
  //       <Button onClick={onPageChange} />
  //     </div>
  //   );
  // }
}

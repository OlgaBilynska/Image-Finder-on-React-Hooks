import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ img }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { tags, largeImageURL, webformatURL } = img;

  return (
    <li className={css.imageGalleryItem}>
      {showModal && (
        <Modal onClick={toggleModal}>
          <img className={css.imageLarge} alt={tags} src={largeImageURL} />
        </Modal>
      )}
      <img
        onClick={toggleModal}
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        width="240"
      />
    </li>
  );
}

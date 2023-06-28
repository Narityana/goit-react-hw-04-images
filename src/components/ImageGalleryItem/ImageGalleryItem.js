import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, webformatURL, selectedImage }) => {
  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__image}
        src={webformatURL}
        alt={tags}
        onClick={selectedImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  selectedImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

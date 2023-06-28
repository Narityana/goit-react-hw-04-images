import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import fetchImages from 'service/Api';

import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  const loadMore = images.length > 0 && page < Math.ceil(totalHits / 12);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const addImages = async () => {
      try {
        setIsLoading(true);
        const imageData = await fetchImages(searchQuery, page);
        if (imageData.totalHits === 0) {
          toast.warning(
            'No results were found for your search, please try something else.'
          );
        }
        setImages(prevState => [...prevState, ...imageData.hits]);
        setTotalHits(imageData.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
  }, [searchQuery, page]);

  const handleSubmit = newSearchQuery => {
    setSearchQuery(newSearchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const onSelectedImage = largeImageURL => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={selectedImage} />
      )}
      <ImageGallery images={images} onSelectedImage={onSelectedImage} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={onLoadMoreClick} />}
    </div>
  );
};

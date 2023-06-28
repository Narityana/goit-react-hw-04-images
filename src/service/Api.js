import axios from 'axios';

async function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35824205-a7946410d22ee02a168027a28';
  const per_page = 12;
  const params = new URLSearchParams({
    key: API_KEY,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    q: searchQuery,
    safesearch: true,
    per_page: per_page,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);

  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
}

export default fetchImages;

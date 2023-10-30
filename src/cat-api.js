import axios from 'axios';

// Устанавливаем API-ключ в заголовке для всех запросов
axios.defaults.headers.common['x-api-key'] = 'live_its2MIYBDJ2UdM1DaFX4x9mCrCfAoMF7BKs8ACR9TbSAnQGGZ5VJSQiKKBFzhTiW';

// Функция для получения списка пород
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для получения информации о коте по идентификатору породы
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





























// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_its2MIYBDJ2UdM1DaFX4x9mCrCfAoMF7BKs8ACR9TbSAnQGGZ5VJSQiKKBFzhTiW';

// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

// function fetchBreeds() {
//   return axios.get('/breeds').then(response => {
//     return response.data;
//   });
// }

// function fetchCatByBreed(breedId) {
//   return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
//     return resp.data;
//   });
// }

// module.exports = { fetchBreeds, fetchCatByBreed };
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Помилка при завантаженні порід: ', error);
      throw error; // 
    });
}

export function fetchCatByBreed(breedId) {
    const loader = document.querySelector('.loader');
    loader.classList.add('visible');

    const errorMessage = document.querySelector('.error');
    errorMessage.classList.remove('.error-message');

    const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return axios.get(apiUrl)
    .then(response => response.data[0])
    .catch(error => {
        console.error('Помилка при запиті про кота: ', error);

        errorMessage.classList.add('.error-message');
        throw error;
    })
    .finally(() => {
        loader.classList.remove('visible')
    });
}

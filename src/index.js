
// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = "live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t";

// function finderCats () {
//     const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
//     const API_KEY = 'live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t';

// return fetch(`${BASE_URL}__${API_KEY}`).then(resp => {
//     console.log(resp);
// })
// }

import axios from "axios";

// Встановіть ключ доступу
axios.defaults.headers.common["x-api-key"] = "live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t";

// Функція для отримання списку порід
export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      // Розпакуємо дані про породи
      const breeds = response.data;

      // Створимо масив опцій для вибору порід
      const breedOptions = breeds.map((breed) => ({
        value: breed.id,
        label: breed.name,
      }));

      return breedOptions;
    })
    .catch((error) => {
      console.error("Помилка при завантаженні порід котів:", error);
      throw error; // Прокинемо помилку для обробки її вище
    });
}

// import { fetchBreeds } from "./cat-api.js";

// fetchBreeds()
//   .then((breeds) => {
//     // Використовуйте масив порід, наприклад, для заповнення вибору на сторінці
//     console.log(breeds);
//   })
//   .catch((error) => {
//     // Обробка помилок, якщо є
//   });

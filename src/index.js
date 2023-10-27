import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t";


breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  const loader = document.querySelector('.loader');
  loader.classList.add('visible');

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfoDiv.innerHTML = `
      <img src="${catData.url}" alt="Зображення кота">
      <h2>Назва породи: ${catData.breeds[0].name}</h2>
      <p>Опис: ${catData.breeds[0].description}</p>
      <p>Темперамент: ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      console.error('Помилка при отриманні даних про кота', error);
    })
    .finally(() => {
      loader.classList.remove('visible');
    });      
  } else {
    catInfoDiv.innerHTML = '';
    loader.classList.remove('visible')
  }
});


// const options = {
//   headers: {
//     'x-api-key' : 'live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t'
//   }
// }
// fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=abys`, options)


// const breedSelect = document.querySelector('.breed-select');
// const catInfoDiv = document.querySelector('.cat-info');

const breedSelect = new SlimSelect({
  select: '#breed-select',
  placeholder: 'Оберіть породу'
});
breedSelect.onChange = () => {
  const selectedBreedId = breedSelect.selected();

  const loader = document.querySelector('.loader');

  loader.style.display = 'block';

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        const catInfoDiv = document.querySelector('.cat-info');
        const breedName = document.querySelector('#breed-name');
        const breedDescription = document.querySelector('#breed-description');
        const breedTemperament = document.querySelector('#breed-temperament');
        
        // Отримано дані про кота, відобразіть їх на сторінці
        catInfoDiv.style.display = 'block';
        breedName.textContent = catData.breeds[0].name;
        breedDescription.textContent = catData.breeds[0].description;
        breedTemperament.textContent = catData.breeds[0].temperament;
      })
      .catch(error => {
        // Відобразити помилку за допомогою Notiflix
        Notiflix.Report.failure('Помилка', 'Сталася помилка під час запиту.');
        console.error('Помилка при отриманні даних про кота: ', error);
      })
      .finally(() => {
        // Приховати завантажувач, коли запит завершено
        loader.style.display = 'none';
      });
  } else {
    // Сховайте інформацію про кота, якщо не обрана порода
    const catInfoDiv = document.querySelector('.cat-info');
    catInfoDiv.style.display = 'none';
    // Приховати завантажувач, коли запит завершено
    loader.style.display = 'none';
  }
};
fetchBreeds() 
  .then(breeds => {
    
    breeds.forEach(breed => {
      breedSelect.data.add({
         text: breed.name,
         value: breed.id  
      });
    });
  })
  .catch(error => {
    Notiflix.Report.Failure('Помилка', 'Сталася помилка під час завантаження списку порід.');
    console.error('Помилка при завантаженні порід: ', error);
  });








  // const BASE_URL = 'https://api.thecatapi.com/v1';
  // const API_KEY = 'live_vHQe36pHRTLs0QD5mvEAHeklHDj7vC1421nryMAZQDOGH4LbNKgPPgMpTLXw4t2t';
  // return fetch(`${BASE_URL}/breeds`).then(resp => {
  //   if (!resp.ok) {
  //     throw new Error(resp.statusText)
  //   }
  //   return resp.json()
  // })
// fetchBreeds();
// .then(data => console.log(data))
// .catch(err => console.log(err))


// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи //












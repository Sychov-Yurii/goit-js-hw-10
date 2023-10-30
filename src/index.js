import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const error = document.querySelector('.error');

// Загрузка списка пород при загрузке страницы
fetchBreeds()
  .then((breeds) => {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((err) => {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error('Error fetching breeds', err);
  });

// Обработка выбора породы
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      const cat = catData[0];
      catImage.src = cat.url;
      breedName.textContent = `Breed: ${cat.breeds[0].name}`;
      description.textContent = `Description: ${cat.breeds[0].description}`;
      temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch((err) => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching cat data', err);
    });
});





























// import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';
// import Notiflix from "notiflix";
// import 'notiflix/dist/notiflix-3.2.6.min.css';



// const selector = document.querySelector('.breed-select');
// const load = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInformation = document.querySelector('.cat-info');

// error.classList.add('is-hidden');

// function getPetsList(breed) {
//   selector.innerHTML = breed
//     .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
//     .join('\n');
// }
// function fetchBreedsAndSetPetsList() {
//   fetchBreeds()
//     .then(result => {
//       getPetsList(result);
//     })
//     .then(() => new SlimSelect({ select: `.breed-select` }))
//     .catch(() => {
//       Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!',
//         { timeout: 4000, userIcon: false }
//       );
//     })
//     .finally(() => {
//       load.classList.add('is-hidden');
//     });
// }
// selector.addEventListener('change', onSelect);

// function onSelect(evt) {
//   const selectBreedId = evt.currentTarget.value;
//   catInformation.classList.add('is-hidden');

//   fetchCatByBreed(selectBreedId)
//     .then(data => {
//       markup(data);
//       catInformation.classList.remove('is-hidden');
//     })
//     .catch(() => {
//       Notiflix.Notify.failure(
//         `Oops! Something went wrong! Try reloading the page!`,
//         { timeout: 4000, userIcon: false }
//       );
//     })
//     .finally(() => {
//       load.classList.add('is-hidden');
//     });
// }
// function markup(data) {
//   const { breeds, url } = data[0];
//   const { name, temperament, description } = breeds[0];
//   const catList = `<img src="${url}" alt="${name}" width=500>
//   <div class ="back-color">
// <h2 class="title">${name}</h2>
// <p class="text">${description}</p>
// <p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
// </div>`;
//   catInformation.innerHTML = catList;
// }

// fetchBreedsAndSetPetsList();
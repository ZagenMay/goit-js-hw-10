import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

fetchCountries();
refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function deleteCountry() {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}

function searchCountry() {
  const onInput = refs.input.value.trim();
  deleteCountry();
  if (!onInput) {
    return;
  }

  fetchCountries(onInput)
    .then(countries => {
      if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      }
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (countries.length > 1) {
        markupCountries(countries);
        return;
      }
      markupCountry(countries);
    })
    .catch(error => console.log(error));
}

function markupCountry(country) {
  refs.list.innerHTML = '';
  const markup = country
    .map(({ name, capital, population, flag, languages }) => {
      return `<div class="country">
                <img src='${flag}' alt='${name} flag' width='80' />
                <h2 class="country__title">${name}</h2>
              </div>
            <ul>
                <li>Capital: ${capital}</li>
                <li>Population: ${population}</li>
                <li>Languages: ${languages.map(i => ` ${i.name}`)}</li>
            </ul>`;
    })
    .join('');
  refs.list.innerHTML = markup;
}

function markupCountries(countries) {
  refs.info.innerHTML = '';
  const markup = countries
    .map(({ name, flag }) => {
      return `<li class="country__item">
                <img src='${flag}' alt='${name} flag' width='60' />
                <p class="country__description">${name}</p>
              </li>`;
    })
    .join('');
  refs.info.innerHTML = markup;
}

import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '../fetchCountries';
import { markupCountries } from '../markups';
import { markupCountry } from '../markups';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),

  listEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(() => {
    const data = refs.input.value.trim();

    if (data === '') {
      clearInput();
      return;
    }

    fetchCountries(data)
      .then(countries => {
        renderCountry(countries);
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        refs.listEl.innerHTML = '';
      });
  }, DEBOUNCE_DELAY)
);

function renderCountry(mainData) {
  if (mainData.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    refs.listEl.innerHTML = '';
    return;
  } else if (mainData.length == 1) {
    const markupRenderCountry = markupCountry(mainData[0]);
    refs.infoEl.innerHTML = markupRenderCountry;
    refs.listEl.innerHTML = '';
    return;
  } else {
    const markupCountriesList = mainData
      .map(country => markupCountries(country))
      .join('');
    refs.listEl.insertAdjacentHTML('beforeend', markupCountriesList);
    refs.infoEl.innerHTML = '';
  }
}

function clearInput() {
  if (refs.input.value === '') {
    refs.infoEl.innerHTML = '';
    refs.listEl.innerHTML = '';
  }
}

import countries from './services/fetchCountries';
import countryListTemplate from '../templates/countyList.hbs';
import countryCardTemplate from '../templates/countryCard.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';
var debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('.input'),
  countryList: document.querySelector('.js-countryList'),
};

refs.input.addEventListener('input', debounce(getCountriesHandler, 500));

function getCountriesHandler(event) {
  const searchQuery = event.target.value;
  clearCountryList();
  countries.fetchCountries(searchQuery).then(data => buildMarkup(data));
}

let markup;
function buildMarkup(countries) {
  if (countries.length === 1) {
    markup = countries.map(country => countryCardTemplate(country)).join('');
    renderCountryRows(refs.countryList);
  } else if (countries.length < 11) {
    markup = countries.map(country => countryListTemplate(country)).join('');
    renderCountryRows(refs.countryList);
  } else {
    return error('Too many matches found. Please enter a more specific query!');
  }
}

function renderCountryRows(directory) {
  directory.insertAdjacentHTML('beforeend', markup);
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

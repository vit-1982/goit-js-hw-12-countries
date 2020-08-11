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
  if (searchQuery !== '') {
    clearCountryList();
    countries.fetchCountries(searchQuery).then(buildMarkup);
  }
}

function buildMarkup(countries) {
  let markup;
  if (countries.length === 1) {
    markup = countries.map(country => countryCardTemplate(country)).join('');
  } else if (countries.length < 11) {
    markup = countries.map(country => countryListTemplate(country)).join('');
  } else {
    return error('Too many matches found. Please enter a more specific query!');
  }
  renderCountryRows(markup);
}

function renderCountryRows(markup) {
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

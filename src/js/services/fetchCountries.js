// import renderCountryRows from '../renderCountryRows';

// export default function fetchCountries(searchQuery) {
//   fetch(searchQuery)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       renderCountryRows(data);
//     });
// }

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(query) {
    return fetch(baseUrl + query).then(response => response.json());
  },
};

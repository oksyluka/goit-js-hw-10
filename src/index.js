import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const isFilled = input.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (isFilled) {
    fetchCountries(isFilled)
      .then(dataProcessing)
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }

  function dataProcessing(data) {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }
    createCountriesList(data);
  }

  function createCountriesList(data) {
    const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li class="country-item"><img src="${svg}" alt="Flag of ${official}" width="100" height="50"/>
        <p class="country-name">${official}</p></li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages).join(', ');

      const markupInfo = `<ul>
      <li><span class="feature">Capital: </span>${data[0].capital}</li>
      <li><span class="feature">Population: </span>${data[0].population}</li>
      <li><span class="feature">Languages: </span>${languages}</li>
      </ul>`;

      countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
    }
    return countryList.insertAdjacentHTML('afterbegin', markupData);
  }
}

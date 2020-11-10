import countriesCard from "./templates/card.hbs";
import countriesList from "./templates/card-list.hbs";
import API from "./js/fetchCountries";
import debounce from "lodash.debounce";

import pnotify from "./js/pnotife";

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  card: document.querySelector(".js-markup-card"),
};

refs.searchForm.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  clearRenderCountriesCard();
  const searchQuery = refs.searchForm.elements.query.value;
  API.fetchCountries(searchQuery)
    .then(searchResultat)
    .catch(error => console.log(error));
}

function searchResultat(countries) {
  const numberCountries = countries.length;

  if (numberCountries === 1) {
    renderCountriesCard(countries, countriesCard);
  } else if (numberCountries >= 2 && numberCountries <= 10) {
    renderCountriesCard(countries, countriesList);
  } else if (numberCountries >= 10) {
    clearRenderCountriesCard();
    pnotify.Info();
  } else {
    clearRenderCountriesCard();
    pnotify.Error();
  }
}
function renderCountriesCard(countries, templateHbs) {
  const markup = templateHbs(countries);
  refs.card.innerHTML = markup;
  console.log(markup);
}
function clearRenderCountriesCard() {
  refs.card.innerHTML = "";
}

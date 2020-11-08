import countriesCard from "./templates/card.hbs";
import debounce from "lodash.debounce";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  card: document.querySelector(".js-markup-card"),
};

refs.searchForm.addEventListener("input", debounce(onSearch, 500));
// function onSearch(e) {
//   e.preventDefault();
//   const searchQuery = refs.searchForm.elements.query.value;
//   fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
//     .then(r => r.json())
//     .then(card => {
//       const markup = regionCard(card);
//       refs.card.innerHTML = markup;
//       console.log(markup);
//     });
// }

function onSearch(e) {
  e.preventDefault();
  const searchQuery = refs.searchForm.elements.query.value;
  fetchCountries(searchQuery)
    .then(renderCountriesCard)
    .catch(error => console.log(error));
}
function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    response => {
      return response.json();
    }
  );
}

function renderCountriesCard(countries) {
  const markup = countriesCard(countries);
  refs.card.innerHTML = markup;
  console.log(markup);
}

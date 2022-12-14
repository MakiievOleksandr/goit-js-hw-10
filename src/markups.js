export function markupCountry({ name, capital, population, flags, languages }) {
  return `<div class="title">
  <img src="${flags.svg}" alt="national flag of ${name}" >
      <h3 class="name">${name.official}</h3>
      </div>
      <ul class="description">
        <li class="country-description">
          <div class="wrapper"><h4 class="subtitle">Capital:</h4>
          <p class="subtitle-text">${capital}</p></div>
          <div class="wrapper"><h4 class="subtitle">Population:</h4>
          <p class="subtitle-text">${population}</p></div>
          <div class="wrapper"><h4 class="subtitle">Languages:</h4>
          <p class="subtitle-text">${Object.values(languages).join(
            ', '
          )}</p></div>
        </li>
      </ul> `;
}

export function markupCountries({ name, flags }) {
  return `<li class="country-item">
  <img src="${flags.svg}" alt="national flag of ${name}" >
  <h4>${name.official}</h4>
</li>`;
}

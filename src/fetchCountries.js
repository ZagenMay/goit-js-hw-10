const BASE_URL = 'https://restcountries.com/v2';
const PARAMS = 'fields=name,capital,population,flag,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${PARAMS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

const cheerio = require('cheerio');
const { default: axios } = require('axios');

const countryCode = process.argv[2];
const postalCode = process.argv[3];

if (!countryCode || !postalCode) {
  console.log('Country code and postal code are required.');
  process.exit();
}

const extractPlace = (selector) => {
  const name = selector.find('td:nth-child(2)').text().trim();
  const postalCode = selector.find('td:nth-child(3)').text().trim();
  const country = selector.find('td:nth-child(4)').text().trim();
  const state = selector.find('td:nth-child(5)').text().trim();
  const municipality = selector.find('td:nth-child(6)').text().trim();
  const city = selector.find('td:nth-child(7)').text().trim();
  return { name, postalCode, country, state, municipality, city };
};

(async () => {
  const url = `https://www.geonames.org/postalcode-search.html?q=${postalCode}&country=${countryCode}`;

  const { data: html } = await axios.get(url);
  
  const selector = cheerio.load(html);

  const tableBody = selector('body').find('table .restable tbody tr');
  
  const temporalPlaces = tableBody.map((_idx, el) => extractPlace(selector(el))).get();
  
  // Remove empty elements
  temporalPlaces.shift();
  temporalPlaces.pop();

  // Process elements to join coordinates with place info
  const places = [];

  for(let i = 0; i < temporalPlaces.length; i++) {
    if ((i + 1) % 2 == 0) {
      const coordinates = temporalPlaces[i].name.split('/');

      places.push({
        ...temporalPlaces[i - 1],
        coordinates: {
          latitude: coordinates[0],
          longitude: coordinates[1],
        },
      });
    }
  }

  console.log(places);
})();

# Get Coordinates (latitude and longitude) from postal code
This short script get the finded coordinates for a postal code and a country code with web scraping techniques.

Maked with Axios and Cheerio, using [GeoNames Database](https://www.geonames.org).

The following example gets latitude and longitude for the 77500 postal code in Mexico.

## How to use
```bash
node inidex.js MX 77500

// Output
[
  {
    name: 'Supermanzana 20 Centro',
    postalCode: '77500',
    country: 'Mexico',
    state: 'Quintana Roo',
    municipality: 'Benito Juárez',
    city: 'Cancún',
    coordinates: { latitude: '20.991', longitude: '-86.939' }
  },
  ...
  {
    name: 'Supermanzana 4 Centro',
    postalCode: '77500',
    country: 'Mexico',
    state: 'Quintana Roo',
    municipality: 'Benito Juárez',
    city: 'Cancún',
    coordinates: { latitude: '20.991', longitude: '-86.939' }
  }
]
```
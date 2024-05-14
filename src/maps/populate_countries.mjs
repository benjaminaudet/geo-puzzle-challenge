// make a function to keep the 50 biggest in terms of population country object of countries_very_simplified_258.json

import * as fs from 'fs';

const countriesGeoJson = JSON.parse(fs.readFileSync('countries_very_simplified_258.json', 'utf8'));
const countriesData = JSON.parse(fs.readFileSync('countries_with_datas.json', 'utf8'));

console.log(countriesGeoJson.features.length);
console.log(countriesData.length);
const countriesGeoJsonWithData = countriesGeoJson.features.map((country) => {
    const countryData = countriesData.find((countryData) => countryData.name === country.properties.name);
    country.properties.population = countryData.Population;
    country.properties.region = countryData.Region;
    country.properties.area = countryData.Area;
    return country;
});

fs.writeFileSync('countriesGeoJsonWithData.json', JSON.stringify(countriesGeoJsonWithData))
console.log(countriesGeoJsonWithData)
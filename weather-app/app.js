const request = require('request');
const geoService = require('./utils/geoService');
const weatherSerice = require('./utils/weatherService');

const { geoLocatePlace } = geoService(request);
const { getWeatherInfo } = weatherSerice(request);

const main = async (country) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(country)}.json?access_token=pk.eyJ1Ijoia2FybGpvc2VidWVuYSIsImEiOiJjazlrbTI1MWIwMGw4M2RuNW1kZXFxbjVjIn0.Zghwkkgcn4bQ5J2Sm2L7ag`;
    console.log('Start checking the weather...');
    const coordinates = await new Promise((resolve, reject) => {
        request({ url: mapboxUrl, json: true }, (err, response) => {
            if (err) {
                reject(err);
            } else if (!response.body.features) {
                resolve(response.body.message);
            } else if (response.body.features.length === 0) {
                resolve('Cannot find location.');
            } else {
                const longitude = response.body.features[0].center[0];
                const latitude = response.body.features[0].center[1];
                resolve({
                    latitude,
                    longitude
                });
            }
        });
    });

    const weatherInfo = await new Promise((resolve, reject) => {
        const weatherStackUrl = `http://api.weatherstack.com/current?access_key=65c17b961a33b46ee92d8c2f9f8832f0&query=${coordinates.latitude},${coordinates.longitude}`;
        request({ url: weatherStackUrl, json: true }, (err, response) => {
            if (err) {
                reject(err);
            } else if (response.body.hasOwnProperty('success')) {
                resolve(response.body.error.info);
            } else if (!response.body.location.name) {
                resolve(`Cannot find the country.`);
            } else {
                const data = response.body;
                resolve(`It's currently ${data.current.temperature} degrees out, but feels like ${data.current.feelslike} out here in ${data.location.country}.`);
            }
        })
    });

    console.log(weatherInfo)
    console.log('Done checking the weather...');
}
// main('India');

const place = process.argv[2];
if (!place)
    return console.log('Plese provide an address to locate.');
geoLocatePlace(place, (err, data) => {
    if (err)
        return console.log('Error:', err);
    console.log('Data:', data);
    getWeatherInfo(data, (err, data = {}) => {
        if (err)
            return console.log('Error:', err);
        console.log('Data:', data);
    })
});
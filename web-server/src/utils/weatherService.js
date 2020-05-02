function weatherService(request) {
    function getWeatherInfo(coordinates, callback) {
        const { latitude, longitude, placeName } = {} = coordinates;
        const url = `http://api.weatherstack.com/current?access_key=65c17b961a33b46ee92d8c2f9f8832f0&query=${latitude},${longitude}`;
        request({ url, json: true }, (err, { body } = {}) => {
            if (err) {
                callback('Cannot connect to weather service.', null);
            } else if (body.hasOwnProperty('success')) {
                callback(body.error.info, null);
            } else if (!body.location.name) {
                callback('Weather service cannot find the place.', null);
            } else {
                callback(null, `The weather is ${body.current.weather_descriptions}. It's currently ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} out here in ${placeName}.`);
            }
        })
    }
    return {
        getWeatherInfo
    }
}

module.exports = weatherService;
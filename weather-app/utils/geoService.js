function geoService(request) {
    function geoLocatePlace(place, callback) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1Ijoia2FybGpvc2VidWVuYSIsImEiOiJjazlrbTI1MWIwMGw4M2RuNW1kZXFxbjVjIn0.Zghwkkgcn4bQ5J2Sm2L7ag`;
        request({ url, json: true }, (err, { body }) => {
            if (err) {
                callback('Unable to connect to location service.', null);
            } else if (!body.features) {
                callback(body.message, null);
            } else if (body.features.length === 0) {
                callback('Location service cannot find place.', null);
            } else {
                const longitude = body.features[0].center[0];
                const latitude = body.features[0].center[1];
                const placeName = body.features[0].place_name;
                const placeData = ({
                    latitude,
                    longitude,
                    placeName
                });
                callback(null, placeData);
            }
        });
    }
    return {
        geoLocatePlace
    }
}

module.exports = geoService;
const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiamF5Z21lcmNhZG8iLCJhIjoiY2tob2V0MXVhMWloZTJ5cGV6Mm0waTF4NiJ9.5_n12YLIU9PSBTJsHRdjow'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to locations services!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try again with different search terms.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
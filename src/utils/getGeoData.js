const getData = require('./getData')
const mapBoxApiKey = 'pk.eyJ1IjoicGFzdWsiLCJhIjoiY2tpcmhsZm01MDR3cjMwcGRtMDRhcGRmZCJ9.Uyn8ISubEiByueNQ9fmAHQ';

const getGeoData = (name, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(name)}.json?access_token=${mapBoxApiKey}&limit=1`;

    getData({
        url,
        json: true
    }, (data) => {
        const {features} = data;
        if (features && features.length) {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        } else {
            callback('Place wasn\'t found', undefined);
        }
    })
}

module.exports = getGeoData;
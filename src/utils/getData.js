const request = require('request');

const getData = (options, callback) => {
    request(options, (error, response) => {
        if (response.statusCode === 200) {
            callback(response.body)
        } else {
            console.log('request failed');
        }
    });
}

module.exports = getData;
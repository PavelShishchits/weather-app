const getData = require('./getData')
const weatherStackKey = '26833dad034b671cf6df680c218b2305';

const getWeatherData = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackKey}&query=${latitude},${longitude}`;
    getData({
        url,
        json: true,
    }, (data) => {
        if (data.error) {
            console.log(data.error.info);
            callback(data.error.info, null)
            return;
        }
        const {current: currentWeather} = data;
        const forecast = `${currentWeather.weather_descriptions && currentWeather.weather_descriptions[0]}, It is currently ${currentWeather.temperature} degrees out and it's feels like ${currentWeather.feelslike}. Wind speed is ${currentWeather.wind_speed}`
        callback(null, forecast)
    })
}

module.exports = getWeatherData;
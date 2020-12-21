const express = require('express');
const {join} = require('path');
const hbs = require('hbs');
const getGeoData = require('./utils/getGeoData');
const getWeatherData = require('./utils/getWeatherData');

const port = process.env.PORT || 3000;
const rootFolder = join(__dirname, '../');
const app = express();

app.use(express.static(join(rootFolder, '/public')));
app.set('view engine', 'hbs');
app.set('x-powered-by', false);
app.set('views', join(rootFolder, '/templates/views'));
hbs.registerPartials(join(rootFolder, '/templates/partials'));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home page',
        name: 'Pavel',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a help message',
        name: 'Pavel',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pavel',
        message: 'help article not found'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            success: false,
            error: 'Provide address',
        })
    }

    getGeoData(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                success: false,
                error,
            })
        }
        getWeatherData({latitude, longitude}, (error, forecast) => {
            if (error) {
                return res.send({
                    success: false,
                    error,
                })
            }
            res.send({
                success: true,
                data: {
                    forecast,
                    location,
                    address,
                }
            });
        })
    });


});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pavel',
        message: 'page not found'
    })
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Port setting
const port = process.env.PORT || 3000;

// Paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Settings for handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Karl Jose Buena'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Karl Jose Buena',
        message: 'I\'m a Fullstack Engineer/Calisthenics Practitioner/Frustrated Basketball Player'
    });
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        name: 'Karl Jose Buena',
        message: 'Weather app you can use to check your weather.'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Karl Jose Buena',
        message: 'Your help message here.'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Not Found',
        name: 'Karl Jose Buena',
        message: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Karl Jose Buena',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

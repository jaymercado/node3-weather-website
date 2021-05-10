const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')

// Setup handlebrs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jay Mercado'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jay Mercado'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        title: 'Help page',
        name: 'Jay Mercado',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (address) {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: address
                })
            })
        })
    } else {
        return res.send({
            error: 'Provide an address.'
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term.'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jay Mercado',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jay Mercado',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
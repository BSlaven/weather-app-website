const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Slaven B'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Slaven B'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Upomoooooć!',
    title: 'Help',
    name: 'Slaven B'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You have to enter an address!'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

// app.get('/products', (req, res) => {
//   if(!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     });
//   }
//   console.log(req.query);
//   res.send({
//     products: []
//   });
// });

app.get('/help/*', (req, res) => {
  res.render('404error', {
    name: 'Slaven',
    title: 'Error 404',
    errorMessage: 'Help article not found!'
  });
});

app.get('*', (req, res) => {
  res.render('404error', {
    name: 'Slaven',
    title: 'Error 404',
    errorMessage: 'Page not found!'
  });
});


app.listen(3000, () => {
  console.log('Server je uspješno pokrenut na portu 3000!');
});
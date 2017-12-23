const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', () => {
    console.log(log);
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'About page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    code: 404,
    message: "Data not found."
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 300')
});
const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  let year = new Date().getFullYear() + 1;
  return year;
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
})

app.use((req, res, next) => {
  res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Welcome',
    projectName: 'GiftAQuiz',
    header: 'Home Test',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    header: 'About Test',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  })
})

app.listen(port, () => {
  console.log("Server is up on Port: ", port);
});

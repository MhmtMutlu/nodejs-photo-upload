const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();
const port = 3000;

//! Connect to DB
mongoose.connect('mongodb://localhost/photo-upload-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//! Template Engine
app.set('view engine', 'ejs');

//! Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//! Routes
app.get('/', pageController.getHomePage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.put('/photos/:id', photoController.updatePhoto);


app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı!`);
});

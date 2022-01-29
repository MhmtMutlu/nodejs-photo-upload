const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//! Connect to DB
mongoose
  .connect(
    `mongodb+srv://mhmetmtlu:${process.env.USER_PASSWORD}@cluster0.bdn1v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Server ile bağlantı kuruldu!'))
  .catch((err) => console.log('Servera bağlanılamadı! -> ', err));

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

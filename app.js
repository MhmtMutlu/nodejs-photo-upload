const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');

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

//! Routes
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({}).sort('-createdDate');
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı!`);
});

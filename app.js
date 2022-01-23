const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

//! Template Engine
app.set('view engine', 'ejs');

//! Middleware
app.use(express.static('public'));

//! Routes
app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı!`);
});

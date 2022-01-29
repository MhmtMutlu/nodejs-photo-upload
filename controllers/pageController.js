const Photo = require('../models/Photo');


exports.getHomePage = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({}).sort('-createdDate');
  res.render('index', {
    photos,
  });
};

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};

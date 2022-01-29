const Photo = require('../models/Photo');

exports.getHomePage = async (req, res) => {
  const page = req.query.page ?? 1;
  const photosPerPage = 3;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort('-createdDate')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  res.render('index', {
    photos,
    pages: Math.ceil(totalPhotos / photosPerPage),
    current: page,
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

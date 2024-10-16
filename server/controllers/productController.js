const Product = require('../models/Product');
const User = require('../models/User');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, college } = req.body;
    const images = req.files.map(file => file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      college,
      images,
      seller: req.user.id,
      location: {
        type: 'Point',
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProducts = async (req, res) => {
  const { college, lat, lng, distance } = req.query;

  try {
    const products = await Product.find({
      college,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance) * 1609.34 // Convert miles to meters
        }
      }
    }).populate('seller', 'name');

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
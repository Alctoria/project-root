const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', [auth, upload.array('images', 5)], createProduct);
router.get('/', getProducts);

module.exports = router;
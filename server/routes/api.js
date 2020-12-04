const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.get('/', catalogController.getProducts, (req, res) => {
  res.status(200).json({ products: res.locals.products });
});

module.exports = router;

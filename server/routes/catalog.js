const express = require('express');

const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.post('/category', catalogController.addCategory, (req, res) =>
  res.sendStatus(200)
);

router.get('/category', catalogController.getCategories, (req, res) =>
  res.status(200).json({ categories: res.locals.categories })
);

router.post('/product', catalogController.addProduct, (req, res) => {
  res.status(200).json();
});

router.get('/product', catalogController.getProducts, (req, res) => {
  res.status(200).json({ products: res.locals.products });
});

router.get('/product/:id', catalogController.getProduct, (req, res) => {
  res.status(200).json({ product: res.locals.product });
});

router.put('/product/:id', (req, res) => {});

router.delete('/product/:id', (req, res) => {});

module.exports = router;
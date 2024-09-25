const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
  const products = Product.getAll();
  res.json(products);
};

exports.getProductById = (req, res) => {
  const product = Product.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};
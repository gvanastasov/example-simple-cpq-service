const Product = require('../models/product');
const Quote = require('../models/quote');

exports.configureProduct = (req, res) => {
  const product = Product.getById(req.params.productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const selectedOptions = req.body.selectedOptions;

  const availableOptions = JSON.parse(product.options);
  
  let finalPrice = product.basePrice;

  for (const key in selectedOptions) {
    if (availableOptions[key]) {
      finalPrice += 50;
    } else {
      return res.status(400).json({ error: `Invalid option: ${key}` });
    }
  }

  const quote = { productId: product.id, selectedOptions, finalPrice };

  res.json({ productId: product.id, selectedOptions, finalPrice });
};

exports.generateQuote = (req, res) => {
  const { productId, selectedOptions } = req.body;

  const product = Product.getById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  let finalPrice = product.basePrice;
  const availableOptions = JSON.parse(product.options);

  for (const key in selectedOptions) {
    if (availableOptions[key]) {
      finalPrice += 50;
    }
  }

  const quoteId = `Q${Math.floor(Math.random() * 100000)}`;

  Quote.create(productId, selectedOptions, finalPrice, quoteId);

  res.status(201).json({ quoteId, finalPrice });
};

exports.getQuoteById = (req, res) => {
  const quote = Quote.getById(req.params.quoteId);
  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }
  res.json(quote);
};
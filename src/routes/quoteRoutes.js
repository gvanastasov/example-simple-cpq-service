const express = require('express');
const { configureProduct, generateQuote, getQuoteById } = require('../controllers/quoteController');

const router = express.Router();

router.post('/configure/:productId', configureProduct);
router.post('/', generateQuote);
router.get('/:quoteId', getQuoteById);

module.exports = router;
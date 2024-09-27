const express = require('express');
const { generateQuote } = require('../controllers/quoteController');

const router = express.Router();

router.post('/', generateQuote);

module.exports = router;
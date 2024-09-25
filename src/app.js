const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const { setupDatabase } = require('./config/db');

const app = express();
app.use(bodyParser.json());

setupDatabase();

app.use('/api/products', productRoutes);
app.use('/api/quotes', quoteRoutes);

app.listen(3000, () => console.log('Server running on port 3000...'));
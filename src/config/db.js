const Database = require('better-sqlite3');
const db = new Database(':memory:');

function setupDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      basePrice REAL,
      options TEXT
    );
    
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY,
      productId INTEGER,
      selectedOptions TEXT,
      finalPrice REAL,
      quoteId TEXT
    );
  `);

  // Seed data
  const insertProduct = db.prepare('INSERT INTO products (name, basePrice, options) VALUES (?, ?, ?)');
  insertProduct.run('Laptop', 1000, JSON.stringify({ color: ['Black', 'Silver'], ram: ['8GB', '16GB'], storage: ['256GB', '512GB'] }));
  insertProduct.run('Phone', 500, JSON.stringify({ color: ['Black', 'White'], storage: ['64GB', '128GB'] }));
}

module.exports = { db, setupDatabase };
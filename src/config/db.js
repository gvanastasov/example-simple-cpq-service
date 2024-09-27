const Database = require('better-sqlite3');
const db = new Database(':memory:');

function setupDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      basePrice REAL,
      options TEXT
    );
    
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      selectedOptions TEXT,
      finalPrice REAL,
      quoteId TEXT
    );

    CREATE TABLE IF NOT EXISTS rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT,
      description TEXT,
      class TEXT
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS product_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL REFERENCES products,
      ruleId INTEGER NOT NULL REFERENCES rules,
      priority INTEGER
    );
  `);

  // Seed data
  const insertProduct = db.prepare('INSERT INTO products (name, category, basePrice, options) VALUES (?, ?, ?, ?)');
  insertProduct.run('Laptop', 'Hardware', 1000, JSON.stringify({ color: ['Black', 'Silver'], ram: ['8GB', '16GB'], storage: ['256GB', '512GB'] }));
  insertProduct.run('Phone', 'Hardware', 500, JSON.stringify({ color: ['Black', 'White'], storage: ['64GB', '128GB'] }));

  const insertRule = db.prepare('INSERT INTO rules (type, name, description, class) VALUES (?, ?, ?, ?)');
  insertRule.run('configuration', 'Product Exists', 'Ensure the product exists', 'ProductExistsRule');
  insertRule.run('pricing', 'Volume Discount', 'Apply a discount based on the quantity', 'VolumeDiscountRule');

  const insertProductRule = db.prepare('INSERT INTO product_rules (productId, ruleId, priority) VALUES (?, ?, ?)');
  insertProductRule.run(1, 1, 10);
  insertProductRule.run(1, 2, 100);
  insertProductRule.run(2, 1, 10);
  insertProductRule.run(2, 2, 100);
}

module.exports = { db, setupDatabase };
const Database = require('better-sqlite3');
const db = new Database(':memory:');

function setupDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      basePrice REAL
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
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER REFERENCES products,
      name TEXT,
      value TEXT,
      price REAL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS product_rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL REFERENCES products,
      ruleId INTEGER NOT NULL REFERENCES rules,
      priority INTEGER,
      parameters TEXT
    );
  `);

  // Seed data
  const insertProduct = db.prepare('INSERT INTO products (name, category, basePrice) VALUES (?, ?, ?)');
  insertProduct.run('Laptop', 'Hardware', 1000);
  insertProduct.run('Phone', 'Hardware', 500);

  const insertOption = db.prepare('INSERT INTO options (productId, name, value, price) VALUES (?, ?, ?, ?)');
  insertOption.run(1, 'color', 'Black', 0);
  insertOption.run(1, 'color', 'Silver', 0);
  insertOption.run(1, 'ram', '8GB', 0);
  insertOption.run(1, 'ram', '16GB', 200);

  insertOption.run(2, 'color', 'Black', 0);
  insertOption.run(2, 'color', 'White', 0);
  insertOption.run(2, 'storage', '64GB', 0);
  insertOption.run(2, 'storage', '128GB', 100);

  const insertRule = db.prepare('INSERT INTO rules (type, name, description, class) VALUES (?, ?, ?, ?)');
  insertRule.run('configuration', 'Product Exists', 'Ensure the product exists', 'ProductExistsRule');
  insertRule.run('configuration', 'Ensure Options', 'Ensure options are configured', 'ProductOptionsEnsureRule');
  insertRule.run('pricing', 'Volume Discount', 'Apply a discount based on the quantity', 'VolumeDiscountRule');
  insertRule.run('pricing', 'Include Options', 'Include the price of the options', 'ProductOptionsIncludeRule');
  insertRule.run('pricing', 'Volume Purchase', 'Allow purchase of multiple products', 'VolumePurchaseRule');
  insertRule.run('validation', 'MaxQuantityRule', 'Ensure the quantity is less than specified', 'MaxQuantityRule');
  
  const insertProductRule = db.prepare('INSERT INTO product_rules (productId, ruleId, priority, parameters) VALUES (?, ?, ?, ?)');
  insertProductRule.run(1, 1, 10, JSON.stringify({ required: true }));
  insertProductRule.run(1, 2, 20, JSON.stringify({}));
  insertProductRule.run(1, 4, 100, JSON.stringify({}));
  insertProductRule.run(1, 5, 105, JSON.stringify({ enabled: true }));
  insertProductRule.run(1, 3, 110, JSON.stringify({ quantity: 10, discount: 0.1 }));
  insertProductRule.run(1, 6, 1000, JSON.stringify({ maxQuantity: 100 }));
  
  insertProductRule.run(2, 1, 10, JSON.stringify({ required: true }));
  insertProductRule.run(2, 2, 20, JSON.stringify({}));
  insertProductRule.run(2, 4, 100, JSON.stringify({}));
  insertProductRule.run(2, 5, 105, JSON.stringify({ enabled: false }));
  insertProductRule.run(2, 3, 110, JSON.stringify({}));
  insertProductRule.run(2, 6, 1000, JSON.stringify({}));
}

module.exports = { db, setupDatabase };
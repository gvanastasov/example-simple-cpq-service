const { db } = require('../config/db');

class Product {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all();
  }

  static getById(id) {
    const productStmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = productStmt.get(id);

    if (!product) {
      return null;
    }

    const optionsStmt = db.prepare('SELECT * FROM options WHERE productId = ?');
    const options = optionsStmt.all(id);

    product.options = options;

    return product;
  }
}

module.exports = Product;

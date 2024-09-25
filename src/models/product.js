const { db } = require('../config/db');

class Product {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    return stmt.get(id);
  }
}

module.exports = Product;

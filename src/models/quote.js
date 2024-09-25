const { db } = require('../config/db');

class Quote {
  static create(productId, selectedOptions, finalPrice, quoteId) {
    const stmt = db.prepare('INSERT INTO quotes (productId, selectedOptions, finalPrice, quoteId) VALUES (?, ?, ?, ?)');
    stmt.run(productId, JSON.stringify(selectedOptions), finalPrice, quoteId);
  }

  static getById(quoteId) {
    const stmt = db.prepare('SELECT * FROM quotes WHERE quoteId = ?');
    return stmt.get(quoteId);
  }
}

module.exports = Quote;
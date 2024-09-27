const { db } = require('../config/db');

class ProductRule {
    static getBy({ id, type }) {
        const stmt = db.prepare(`
            SELECT pr.*, r.*
            FROM product_rules pr
            JOIN rules r ON pr.ruleId = r.id
            WHERE pr.productId = ? AND r.type = ?
            ORDER BY pr.priority ASC
        `);
        return stmt.all(id, type);
    }
}

module.exports = ProductRule;
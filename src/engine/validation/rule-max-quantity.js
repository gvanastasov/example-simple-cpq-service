const Rule = require('../rule');

class MaxQuantityRule extends Rule {
    constructor({ maxQuantity }) {
        super();
        this.maxQuantity = maxQuantity;
    }

    apply(context) {
        if (this.maxQuantity === undefined) {
            console.error('MaxQuantityRule requires maxQuantity parameter.');
            return;
        }

        const quantity = context.request.product.quantity || 1;

        if (quantity >= this.maxQuantity) {
            context.error({ message: `Quantity exceeds maximum limit of ${this.maxQuantity}` });
        }
    }
}

module.exports = MaxQuantityRule;
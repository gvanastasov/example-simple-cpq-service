const Rule = require('../rule');

/**
 * @description rule allowing for volume purchases.
 */
class VolumePurchaseRule extends Rule {
    constructor({ enabled }) {
        super();
        this.enabled = enabled;
    }

    apply(context) {
        const quantity = context.request.product.quantity || 1;
        
        if (typeof quantity !== 'number') {
            context.error('Quantity must be a number');
        }

        if (quantity < 1) {
            context.error('Quantity must be greater than 0');
        }

        if (quantity > 1 && !this.enabled) {
            context.error('Volume purchase is not enabled');
        }

        if (quantity > 1) {
            context.quote.price.base *= quantity;
            context.quote.price.offering *= quantity;
        }
    }
}
  
module.exports = VolumePurchaseRule;
const Rule = require('../rule');

class ProductOptionsIncludeRule extends Rule {
    apply(context) {
        const quantity = context.request.product.quantity || 1;

        for (const option of context.quote.product.options) {
            context.quote.price.unit += option.price;
            context.quote.price.base += option.price * quantity;
            context.quote.price.offering += option.price * quantity;
        }
    }
}

module.exports = ProductOptionsIncludeRule;

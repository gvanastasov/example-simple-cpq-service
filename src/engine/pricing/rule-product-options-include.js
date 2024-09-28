const Rule = require('../rule');

class ProductOptionsIncludeRule extends Rule {
    apply(context) {
        for (const option of context.quote.product.options) {
            context.quote.price.unit += option.price;
            context.quote.price.base += option.price;
            context.quote.price.offering += option.price;
        }
    }
}

module.exports = ProductOptionsIncludeRule;

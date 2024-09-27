const Product = require('../../models/product');

class ProductExistsRule {
    constructor({ required }) {
        this.required = required;
    }

    apply(context) {
        const productId = context.request.product.id;
        const product = Product.getById(productId);

        if (product) {
            context.bind('product', product);
        } else if (this.required) {
            context.error(`Product with ID ${productId} does not exist.`);
        }
    }
}

module.exports = ProductExistsRule;
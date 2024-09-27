const Product = require('../../models/product');

class ProductExistsRule {
    apply(context) {
        const productId = context.request.product.id;
        const product = Product.getById(productId);

        if (product) {
            context.bind('product', product);
        } else {
            context.error(`Product with ID ${productId} does not exist.`);
        }
    }
}

module.exports = ProductExistsRule;
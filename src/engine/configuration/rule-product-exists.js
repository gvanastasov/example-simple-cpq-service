const Product = require('../../models/product');

class ProductExistsRule {
    apply(context) {
        const productId = context.product.id;
        const product = Product.getById(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }

        return true;
    }
}
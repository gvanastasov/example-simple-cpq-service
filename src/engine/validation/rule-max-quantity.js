class MaxQuantityRule {
    apply(context) {
        const quantity = context.request.product.quantity || 1;

        if (quantity > 100) {
            context.error({ message: 'Quantity exceeds maximum limit of 100' });
        }
    }
}

module.exports = MaxQuantityRule;
/**
 * @description sample volume discount rule that adjusts the price 
 * based on the quantity.
 */
class VolumeDiscountRule {
  // todo: make quantity and discount configurable
  apply(context) {
    const quantity = context.request.product.quantity || 1;

    if (quantity >= 10) {
      const basePrice = context.quote.price.base;
      const discount = basePrice * 0.10;
      
      context.quote.price.discounts.push({ name: 'Volume Discount', amount: discount });
      context.quote.price.offering -= discount;
    }
  }
}
  
module.exports = VolumeDiscountRule;
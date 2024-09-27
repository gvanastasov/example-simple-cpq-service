/**
 * @description sample volume discount rule that adjusts the price 
 * based on the quantity.
 */
class VolumeDiscountRule {
  constructor({ quantity, discount }) {
    this.quantity = quantity;
    this.discount = discount;
  }

  apply(context) {
    if (this.quantity === undefined || this.discount === undefined) {
      console.error('VolumeDiscountRule requires quantity and discount parameters.');
      return;
    }

    const quantity = context.request.product.quantity || 1;

    if (quantity >= this.quantity) {
      const basePrice = context.quote.price.base;
      const discount = basePrice * this.discount;
      
      context.quote.price.discounts.push({ name: 'Volume Discount', amount: discount });
      context.quote.price.offering -= discount;
    }
  }
}
  
module.exports = VolumeDiscountRule;
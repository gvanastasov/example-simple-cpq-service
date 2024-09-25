/**
 * @description sample volume discount rule that adjusts the price 
 * based on the quantity.
 */
class VolumeDiscountRule {
    // todo: make quantity and discount configurable
    apply(basePrice, product, selectedOptions) {
      const quantity = selectedOptions.quantity || 1;
  
      if (quantity > 10) {
        return basePrice * 0.9;
      }
  
      return basePrice;
    }
  }
  
  module.exports = VolumeDiscountRule;
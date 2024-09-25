const RuleFactory = require('../rule-factory');

class PricingService {
  static calculatePrice(product, selectedOptions, userContext) {
    let basePrice = product.basePrice;

    const pricingRules = RuleFactory.loadRules('pricing', product, userContext);

    pricingRules.forEach(rule => {
      basePrice = rule.apply(basePrice, product, selectedOptions);
    });

    return basePrice;
  }
}

module.exports = PricingService;
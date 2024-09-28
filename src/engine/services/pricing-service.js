const RuleFactory = require('../rule-factory');

class PricingService {
  static calculatePrice(context) {
    if (context.status.priced || context.status.error) {
      return;
    }

    const pricingRules = RuleFactory.loadRules('pricing', context);

    const unitBasePrice = context.quote.product.basePrice;

    context.quote.price.unit = unitBasePrice;
    context.quote.price.base = unitBasePrice;
    context.quote.price.offering = unitBasePrice;
    
    for (const rule of pricingRules) {
      rule.apply(context);
      if (context.status.error) {
        break;
      }
    }
    
    if (!context.status.error) {
      context.status.priced = true;
    }
  }
}

module.exports = PricingService;
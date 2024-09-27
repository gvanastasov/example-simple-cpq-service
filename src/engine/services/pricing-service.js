const RuleFactory = require('../rule-factory');

class PricingService {
  static calculatePrice(context) {
    if (context.status.priced || context.status.error) {
      return;
    }

    const pricingRules = RuleFactory.loadRules('pricing', context);

    const unitBasePrice = context.quote.product.basePrice;
    const quantity = context.request.product.quantity;

    context.quote.price.unit = unitBasePrice;
    context.quote.price.base = unitBasePrice * quantity;
    context.quote.price.offering = unitBasePrice * quantity;
    
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
const RuleFactory = require('../rule-factory');

class ValidationService {
  static validateConfiguration(context) {
    if (context.status.validated || context.status.error) {
      return;
    }

    const validationRules = RuleFactory.loadRules('validation', context);

    for (const rule of validationRules) {
      rule.apply(context);
      if (context.status.error) {
        break;
      }
    }

    if (!context.status.error) {
      context.status.validated = true;
    }
  }
}

module.exports = ValidationService;
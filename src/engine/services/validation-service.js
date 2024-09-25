const RuleFactory = require('../rule-factory');

class ValidationService {
  static validateConfiguration(product, selectedOptions) {
    const validationRules = RuleFactory.loadRules('validation', product);

    let isValid = true;
    validationRules.forEach(rule => {
      if (!rule.apply(product, selectedOptions)) {
        isValid = false;
      }
    });

    return isValid;
  }
}

module.exports = ValidationService;
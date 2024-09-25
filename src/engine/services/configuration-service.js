const RuleFactory = require('../rule-factory');

class ConfigurationService {
  static applyRules(context) {
    const configurationRules = RuleFactory.loadRules('configuration', context);

    for (const rule of configurationRules) {
      if (!rule.apply(context)) {
        return false;
      }
    }

    return true;
  }
}

module.exports = ConfigurationService;
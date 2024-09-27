const RuleFactory = require('../rule-factory');

class ConfigurationService {
  static applyRules(context) {
    if (context.status.configured || context.status.error) {
      return;
    }

    const configurationRules = RuleFactory.loadRules('configuration', context);

    for (const rule of configurationRules) {
      rule.apply(context);
      if (context.status.error) {
        break;
      }
    }

    if (!context.status.error) {
      context.status.configured = true
    }
  }
}

module.exports = ConfigurationService;
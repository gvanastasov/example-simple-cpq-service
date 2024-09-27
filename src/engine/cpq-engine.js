const ConfigurationService  = require('./services/configuration-service');
const PricingService        = require('./services/pricing-service');
const ValidationService     = require('./services/validation-service');

class CPQEngine {
    static run(context) {
        // Step 1: Configure - apply configuration rules
        ConfigurationService.applyRules(context);

        // Step 2: Price - calculate based on pricing rules
        PricingService.calculatePrice(context);

        // Step 3: Qualify - validate the quote based on validation rules
        ValidationService.validateConfiguration(context);
    }
}

module.exports = CPQEngine;
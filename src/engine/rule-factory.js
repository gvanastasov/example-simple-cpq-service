const ProductRule = require('../models/product-rule');

const ConfigurationRules    = require('./configuration');
const PricingRules          = require('./pricing');
const ValidationRules       = require('./validation');

const ruleDefinitions = { ...ConfigurationRules, ...PricingRules, ...ValidationRules };

/**
 * @description Responsible for loading the appropriate rules for a product. The 
 * rules could be stored in the database, in configuration files, or directly in 
 * code.
 */
class RuleFactory {
    static loadRules(type, context) {
        var rules = ProductRule.getBy({ id: context.request.product.id, type });

        return rules.reduce((arr, rule) => {
            const definition = ruleDefinitions[rule.class];
            if (definition) {
                const args = JSON.parse(rule.parameters);
                arr.push(new definition(args));
            }
            else {
                console.error(`Rule definition not found for ${rule.class}`);
            }
            return arr;
        }, []);
    }
}

module.exports = RuleFactory;
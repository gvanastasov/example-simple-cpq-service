const ProductRule = require('../models/product-rule');

const ProductExistsRule = require('./configuration/rule-product-exists');
const VolumeDiscountRule = require('./pricing/rule-volume-discount');

const ruleDefinitions = {
    ProductExistsRule,
    VolumeDiscountRule,
};

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
                arr.push(new definition());
            }
            return arr;
        }, []);
    }
}

module.exports = RuleFactory;
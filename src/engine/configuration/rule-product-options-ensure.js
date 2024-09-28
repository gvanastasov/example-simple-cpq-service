const Rule = require('../rule');

class ProductOptionsEnsureRule extends Rule {
    apply(context) {
        const options = context.quote.product.options
            .reduce((groups, option) => {
                if (!groups[option.name]) {
                    groups[option.name] = [];
                }
                groups[option.name].push(option);
                return groups;
            }, {});

        const selectedOptions = context.request.product.options;
        const result = [];
        
        for (const selectedOption of selectedOptions) {
            const group = options[selectedOption.name];
            if (!group) {
                context.error(`Option ${selectedOption.name} is not available for product`);
                return;
            }

            const option = group.find(x => x.value === selectedOption.value);
            if (!option) {
                context.error(`Option ${selectedOption.name} with value ${selectedOption.value} is not available for product`);
                return;
            }
            result.push(option);
        }

        for (const groupName of Object.keys(options)) {
            if (result.find(x => x.name === groupName)) {
                continue;
            }
            const group = options[groupName];
            // todo: we should probably have this in db
            // as well as if option is required or not :)
            const defaultOption = group.find(x => x.price === 0);
            result.push({ ...defaultOption });
        }

        context.quote.product.options = result;
    }
}

module.exports = ProductOptionsEnsureRule;

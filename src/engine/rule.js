class Rule {
    constructor() {
        if (new.target === Rule) {
            throw new TypeError("Cannot construct Rule instances directly");
        }
    }

    apply(context) {
        throw new Error("Method 'apply()' must be implemented.");
    }
}

module.exports = Rule;
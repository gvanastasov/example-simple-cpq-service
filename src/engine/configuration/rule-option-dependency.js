class OptionDependencyRule {
    /**
     * Enforces dependencies between options.
     * Example rule: if option A is selected, option B must also be selected.
     * @param {object} product - The product object.
     * @param {object} selectedOptions - The options selected by the user.
     * @returns {boolean} - Returns true if the configuration is valid, false otherwise.
     */
    apply(product, selectedOptions) {
      const dependencies = product.optionDependencies || [];
  
      for (const dependency of dependencies) {
        const { ifSelected, thenRequired } = dependency;
  
        if (selectedOptions[ifSelected] && !selectedOptions[thenRequired]) {
          console.error(
            `Invalid configuration: If option "${ifSelected}" is selected, option "${thenRequired}" must also be selected.`
          );
          return false;
        }
      }
  
      return true;
    }
  }
  
  module.exports = OptionDependencyRule;
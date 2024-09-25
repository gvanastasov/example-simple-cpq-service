class WarehouseAvailabilityRule {
    /**
     * Validates if the selected product configuration is available in the warehouse.
     * @param {object} product - The product being configured.
     * @param {object} selectedOptions - The options selected by the user (e.g., color, storage).
     * @param {object} userContext - Information about the user (e.g., location or preferred warehouse).
     * @returns {boolean} - Returns true if the configuration is available in the warehouse, false otherwise.
     */
    apply(product, selectedOptions, userContext) {
      const warehouseStock = product.warehouseStock || {};
      const warehouseId = userContext.warehouseId;
  
      if (!warehouseStock[warehouseId]) {
        console.error(`No stock information available for warehouse: ${warehouseId}`);
        return false;
      }
  
      const availableStock = warehouseStock[warehouseId];
  
      const { color, storage } = selectedOptions;
  
      if (availableStock[color] && availableStock[color][storage] > 0) {
        return true;
      }
  
      console.error(`Selected configuration (color: ${color}, storage: ${storage}) is not available in warehouse: ${warehouseId}`);
      return false;
    }
  }
  
  module.exports = WarehouseAvailabilityRule;
import React from 'react';
import { formatCurrency } from '../utils/formatters';

const SummaryCards = ({ inventoryData, currentMonth }) => {
  const calculateSummary = () => {
    if (!inventoryData || !inventoryData[currentMonth]) return { totalProducts: 0, totalUnits: 0, totalCostValue: 0, totalRetailValue: 0 };
    
    let totalProducts = 0;
    let totalUnits = 0;
    let totalCostValue = 0;
    let totalRetailValue = 0;

    inventoryData[currentMonth].forEach(item => {
      const [, retail, cost, quantity] = item;
      const costValue = cost * quantity;
      const retailValue = retail * quantity;
      
      totalProducts++;
      totalUnits += quantity;
      totalCostValue += costValue;
      totalRetailValue += retailValue;
    });

    return { totalProducts, totalUnits, totalCostValue, totalRetailValue };
  };

  const summary = calculateSummary();

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total Products</h3>
        <p id="total-products">{summary.totalProducts}</p>
      </div>
      <div className="summary-card">
        <h3>Total Units</h3>
        <p id="total-units">{summary.totalUnits.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <h3>Cost Value</h3>
        <p id="total-cost-value">{formatCurrency(summary.totalCostValue)}</p>
      </div>
      <div className="summary-card">
        <h3>Retail Value</h3>
        <p id="total-retail-value">{formatCurrency(summary.totalRetailValue)}</p>
      </div>
    </div>
  );
};

export default SummaryCards; 
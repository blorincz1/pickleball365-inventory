export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const exportToCSV = (inventoryData, currentMonth, months) => {
  const monthName = months[currentMonth];
  let csv = 'Product Name,Retail Price,Cost Price,Quantity,Cost Value,Retail Value\n';
  
  let totalProducts = 0;
  let totalUnits = 0;
  let totalCostValue = 0;
  let totalRetailValue = 0;
  
  inventoryData[currentMonth].forEach(item => {
    const [name, retail, cost, quantity] = item;
    const costValue = cost * quantity;
    const retailValue = retail * quantity;
    
    totalProducts++;
    totalUnits += quantity;
    totalCostValue += costValue;
    totalRetailValue += retailValue;
    
    csv += `"${name}",${retail},${cost},${quantity},${costValue.toFixed(2)},${retailValue.toFixed(2)}\n`;
  });
  
  // Add summary totals at the bottom
  csv += '\n'; // Empty row for separation
  csv += `"SUMMARY - ${monthName} 2025",,,,,,\n`;
  csv += `"Total Products",${totalProducts},,,,\n`;
  csv += `"Total Units",,${totalUnits},,,\n`;
  csv += `"Total Cost Value",,,,${totalCostValue.toFixed(2)},\n`;
  csv += `"Total Retail Value",,,,,${totalRetailValue.toFixed(2)}\n`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `inventory_${monthName.toLowerCase()}_2025.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}; 
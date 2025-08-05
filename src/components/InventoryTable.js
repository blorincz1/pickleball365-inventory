import React from 'react';
import { formatCurrency } from '../utils/formatters';

const InventoryTable = ({ 
  inventoryData, 
  currentMonth, 
  categoryEmojis, 
  deleteMode, 
  inventoryByCategory,
  onUpdateQuantity, 
  onDeleteProduct 
}) => {
  if (!inventoryData || !inventoryData[currentMonth] || !inventoryByCategory) {
    return <div>Loading...</div>;
  }

  const categories = ['Paddles', 'Apparel', 'Accessories'];

  const renderTableRows = () => {
    const rows = [];
    
    categories.forEach(category => {
      // Add category header row
      rows.push(
        <tr key={`category-${category}`}>
          <td colSpan="6" className="category-header">
            {categoryEmojis[category]} {category}
          </td>
        </tr>
      );

      // Get the category data for current month

      // Find products in this category
      const categoryProductsList = [];
      
      if (inventoryByCategory[category]) {
        inventoryByCategory[category].forEach((item, categoryIndex) => {
          // Find the global index of this product in the flattened inventory
          let globalIndex = 0;
          for (let i = 0; i < categories.indexOf(category); i++) {
            globalIndex += inventoryByCategory[categories[i]]?.length || 0;
          }
          globalIndex += categoryIndex;
          
          categoryProductsList.push({ item, index: globalIndex });
        });
      }

              // Render products in this category
        categoryProductsList.forEach(({ item, index }) => {
          const [name, retail, cost] = item;
          // Get the current quantity from the actual inventory data
          const currentQuantity = inventoryData[currentMonth]?.[index]?.[3] || 0;
          const costValue = cost * currentQuantity;
          const retailValue = retail * currentQuantity;

        // Apply styling based on stock levels
        let rowClassName = '';
        if (currentQuantity === 0) {
          rowClassName = 'out-of-stock';
        } else if (currentQuantity <= 3) {
          rowClassName = 'low-stock';
        }

        rows.push(
          <tr key={`product-${index}`} className={rowClassName}>
            <td className="product-name">
              {name}
              {deleteMode && (
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteProduct(index)}
                  title="Delete Product"
                >
                  ✕
                </button>
              )}
            </td>
            <td className="currency">{formatCurrency(retail)}</td>
            <td className="currency">{formatCurrency(cost)}</td>
            <td>
              <input 
                type="number" 
                className="editable" 
                value={currentQuantity} 
                min="0" 
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  onUpdateQuantity(index, value);
                }}
              />
            </td>
            <td className="currency">{formatCurrency(costValue)}</td>
            <td className="currency">{formatCurrency(retailValue)}</td>
          </tr>
        );
      });
    });

    return rows;
  };

  return (
    <div className="table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Retail Price</th>
            <th>Cost Price</th>
            <th>Qty</th>
            <th>Cost Value</th>
            <th>Retail Value</th>
          </tr>
        </thead>
        <tbody id="inventory-body">
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable; 
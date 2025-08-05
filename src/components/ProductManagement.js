import React from 'react';
import { exportToCSV } from '../utils/formatters';

const ProductManagement = ({ onAddProduct, onToggleDeleteMode, deleteMode, inventoryData, currentMonth, months }) => {
  const handleExport = () => {
    if (inventoryData && inventoryData[currentMonth]) {
      exportToCSV(inventoryData, currentMonth, months);
    }
  };

  return (
    <div className="product-management">
      <button className="manage-btn" onClick={onAddProduct}>
        ➕ Add Product
      </button>
      <button 
        className="manage-btn" 
        onClick={onToggleDeleteMode}
        style={{
          background: deleteMode 
            ? 'linear-gradient(45deg, #e74c3c, #c0392b)' 
            : 'linear-gradient(45deg, #9b59b6, #8e44ad)'
        }}
      >
        {deleteMode ? '❌ Exit Delete Mode' : '🗑️ Delete Mode'}
      </button>
      <button className="export-btn" onClick={handleExport}>
        📥 Export CSV
      </button>
    </div>
  );
};

export default ProductManagement; 
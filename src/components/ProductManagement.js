import React from 'react';
import { exportToCSV } from '../utils/formatters';

const ProductManagement = ({ onAddProduct, onToggleDeleteMode, deleteMode, inventoryData, currentMonth, months, useDatabase, onToggleDatabase, onPopulateDatabase }) => {
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
      <button 
        className="manage-btn" 
        onClick={onToggleDatabase}
        style={{
          background: useDatabase 
            ? 'linear-gradient(45deg, #27ae60, #2ecc71)' 
            : 'linear-gradient(45deg, #f39c12, #e67e22)'
        }}
      >
        {useDatabase ? '🗄️ Database Mode' : '💾 LocalStorage Mode'}
      </button>
      {!useDatabase && (
        <button 
          className="manage-btn" 
          onClick={onPopulateDatabase}
          style={{
            background: 'linear-gradient(45deg, #3498db, #2980b9)'
          }}
        >
          🚀 Populate Database
        </button>
      )}
    </div>
  );
};

export default ProductManagement; 
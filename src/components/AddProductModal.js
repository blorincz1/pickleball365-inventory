import React, { useState } from 'react';

const AddProductModal = ({ show, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    retailPrice: '',
    costPrice: '',
    category: 'Paddles',
    initialQuantity: '0'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, retailPrice, costPrice, category, initialQuantity } = formData;
    
    if (name && retailPrice >= 0 && costPrice >= 0 && category) {
      const success = onAddProduct(
        name.trim(),
        parseFloat(retailPrice),
        parseFloat(costPrice),
        category,
        parseInt(initialQuantity) || 0
      );
      
      if (success) {
        setFormData({
          name: '',
          retailPrice: '',
          costPrice: '',
          category: 'Paddles',
          initialQuantity: '0'
        });
        onClose();
      } else {
        alert('Error adding product. Please try again.');
      }
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!show) return null;

  return (
    <div id="addProductModal" className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Product</h2>
        <form id="addProductForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input
              type="text"
              id="productName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="retailPrice">Retail Price *</label>
            <input
              type="number"
              id="retailPrice"
              name="retailPrice"
              value={formData.retailPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="costPrice">Cost Price *</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Paddles">Paddles</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="initialQuantity">Initial Quantity</label>
            <input
              type="number"
              id="initialQuantity"
              name="initialQuantity"
              value={formData.initialQuantity}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal; 
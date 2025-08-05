import React, { useState } from 'react';
import './App.css';
import InventoryTable from './components/InventoryTable';
import MonthSelector from './components/MonthSelector';
import SummaryCards from './components/SummaryCards';
import ProductManagement from './components/ProductManagement';
import AddProductModal from './components/AddProductModal';
import { useInventoryData } from './hooks/useInventoryData';

function App() {

  const {
    inventoryData,
    currentMonth,
    deleteMode,
    inventoryByCategory,
    updateQuantity,
    switchMonth,
    toggleDeleteMode,
    addProduct,
    deleteProduct
  } = useInventoryData();

  const [showAddModal, setShowAddModal] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const categoryEmojis = {
    'Paddles': '🏓',
    'Apparel': '👕',
    'Accessories': '🎒'
  };



  return (
    <div className="App">
      <div className="container">
        <h1>Pickleball 365 Inventory Tracker</h1>
        <br />
        
        <ProductManagement 
          onAddProduct={() => setShowAddModal(true)}
          onToggleDeleteMode={toggleDeleteMode}
          deleteMode={deleteMode}
          inventoryData={inventoryData}
          currentMonth={currentMonth}
          months={months}
        />

        <MonthSelector 
          currentMonth={currentMonth}
          onMonthChange={switchMonth}
          months={months}
        />

        <SummaryCards 
          inventoryData={inventoryData}
          currentMonth={currentMonth}
        />

        <InventoryTable 
          inventoryData={inventoryData}
          currentMonth={currentMonth}
          categoryEmojis={categoryEmojis}
          deleteMode={deleteMode}
          inventoryByCategory={inventoryByCategory}
          onUpdateQuantity={updateQuantity}
          onDeleteProduct={deleteProduct}
        />

        <AddProductModal 
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddProduct={addProduct}
        />
      </div>
    </div>
  );
}

export default App;

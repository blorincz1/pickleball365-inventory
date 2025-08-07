import React, { useState, useEffect } from 'react';
import './App.css';
import InventoryTable from './components/InventoryTable';
import MonthSelector from './components/MonthSelector';
import SummaryCards from './components/SummaryCards';
import ProductManagement from './components/ProductManagement';
import AddProductModal from './components/AddProductModal';
import Auth from './components/Auth.tsx';
import { useInventoryData } from './hooks/useInventoryData';
import { useInventoryDataAppSync } from './hooks/useInventoryDataAppSync';
import { getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import './amplifyconfiguration.ts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    inventoryData,
    currentMonth,
    deleteMode,
    inventoryByCategory,
    isLoading: dataLoading,
    useDatabase,
    updateQuantity,
    switchMonth,
    toggleDeleteMode,
    addProduct,
    deleteProduct,
    populateDatabase,
    toggleDatabase
  } = useInventoryDataAppSync();

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

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="App">
        <div className="loading">Loading inventory data...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthStateChange={setIsAuthenticated} />;
  }



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
          useDatabase={useDatabase}
          onToggleDatabase={toggleDatabase}
          onPopulateDatabase={populateDatabase}
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

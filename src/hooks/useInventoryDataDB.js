import { useState, useEffect } from 'react';
import { InventoryService } from '../services/inventoryService.ts';

export const useInventoryDataDB = () => {
  const [inventoryData, setInventoryData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [deleteMode, setDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMigrated, setHasMigrated] = useState(false);

  // Load data from database
  const loadInventoryData = async () => {
    try {
      setIsLoading(true);
      console.log('Loading inventory data...');
      
      // Check if we need to migrate from localStorage
      const localStorageData = localStorage.getItem('inventoryData');
      console.log('localStorage data:', localStorageData);
      
      if (localStorageData && !hasMigrated) {
        console.log('Attempting to migrate from localStorage...');
        const parsedData = JSON.parse(localStorageData);
        const success = await InventoryService.migrateFromLocalStorage(parsedData);
        console.log('Migration success:', success);
        if (success) {
          localStorage.removeItem('inventoryData'); // Clear localStorage after migration
          setHasMigrated(true);
        }
      }

      // Load all inventory from database
      console.log('Loading from database...');
      const allInventory = await InventoryService.getAllInventory();
      console.log('Database inventory:', allInventory);
      
      // Group by month
      const groupedData = {};
      allInventory.forEach(item => {
        if (!groupedData[item.month]) {
          groupedData[item.month] = [];
        }
        groupedData[item.month].push([item.name, item.retail, item.cost, item.quantity]);
      });

      console.log('Grouped data:', groupedData);
      setInventoryData(groupedData);
    } catch (error) {
      console.error('Error loading inventory data:', error);
      // Fallback to localStorage if database fails
      const localStorageData = localStorage.getItem('inventoryData');
      if (localStorageData) {
        console.log('Falling back to localStorage data');
        setInventoryData(JSON.parse(localStorageData));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadInventoryData();
  }, []);

  // Update quantity in database
  const updateQuantity = async (index, newQuantity) => {
    try {
      const currentMonthData = inventoryData[currentMonth] || [];
      if (currentMonthData[index]) {
        const item = currentMonthData[index];
        const itemName = item[0];
        
        // Find the item in database and update it
        const allInventory = await InventoryService.getAllInventory();
        const dbItem = allInventory.find(i => 
          i.name === itemName && i.month === currentMonth
        );
        
        if (dbItem) {
          await InventoryService.updateQuantity(dbItem.id, parseInt(newQuantity));
          // Reload data to reflect changes
          await loadInventoryData();
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Switch month
  const switchMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
  };

  // Toggle delete mode
  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  // Add new product
  const addProduct = async (name, retail, cost, category, quantity = 0) => {
    try {
      await InventoryService.addInventoryItem({
        name,
        retail: parseFloat(retail),
        cost: parseFloat(cost),
        quantity: parseInt(quantity),
        month: currentMonth,
        category
      });
      
      // Reload data to reflect changes
      await loadInventoryData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Delete product
  const deleteProduct = async (index) => {
    try {
      const currentMonthData = inventoryData[currentMonth] || [];
      if (currentMonthData[index]) {
        const item = currentMonthData[index];
        const itemName = item[0];
        
        // Find the item in database and delete it
        const allInventory = await InventoryService.getAllInventory();
        const dbItem = allInventory.find(i => 
          i.name === itemName && i.month === currentMonth
        );
        
        if (dbItem) {
          await InventoryService.deleteInventoryItem(dbItem.id);
          // Reload data to reflect changes
          await loadInventoryData();
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Group inventory by category for display
  const inventoryByCategory = {};
  const currentMonthData = inventoryData[currentMonth] || [];
  
  currentMonthData.forEach((item, index) => {
    const [name, retail, cost, quantity] = item;
    let category = 'Other';
    
    // Determine category based on product name
    if (name.includes('Paddle') || name.includes('FRANKLIN') || name.includes('P365 Pickleball Paddle')) {
      category = 'Paddles';
    } else if (name.includes('Shirt') || name.includes('Skort') || name.includes('Visor') || name.includes('Headband')) {
      category = 'Apparel';
    } else {
      category = 'Accessories';
    }
    
    if (!inventoryByCategory[category]) {
      inventoryByCategory[category] = [];
    }
    inventoryByCategory[category].push([name, retail, cost, quantity, index]);
  });

  return {
    inventoryData,
    currentMonth,
    deleteMode,
    inventoryByCategory,
    isLoading,
    updateQuantity,
    switchMonth,
    toggleDeleteMode,
    addProduct,
    deleteProduct,
    loadInventoryData
  };
}; 
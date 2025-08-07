import { useState, useEffect } from 'react';
import { AppSyncService } from '../services/appSyncService.ts';

export const useInventoryDataAppSync = () => {
  const [inventoryData, setInventoryData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [deleteMode, setDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMigrated, setHasMigrated] = useState(false);
  const [useDatabase, setUseDatabase] = useState(false); // Toggle between localStorage and database

  const dbService = new AppSyncService();

  // Load data from database or localStorage
  const loadInventoryData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Loading inventory data...');
      
      if (useDatabase) {
        console.log('🗄️ Loading from AppSync...');
        // Load from database
        const allItems = await dbService.getItemsByMonth(currentMonth);
        console.log('📦 AppSync items:', allItems);
        
        // Group by month
        const groupedData = {};
        allItems.forEach(item => {
          if (!groupedData[item.month]) {
            groupedData[item.month] = [];
          }
          groupedData[item.month].push([item.name, item.retail, item.cost, item.quantity]);
        });

        console.log('📊 Grouped data:', groupedData);
        setInventoryData(groupedData);
      } else {
        console.log('💾 Loading from localStorage...');
        // Load from localStorage
        const localStorageData = localStorage.getItem('inventoryData');
        console.log('📦 localStorage data:', localStorageData);
        
        if (localStorageData) {
          setInventoryData(JSON.parse(localStorageData));
        }
      }
    } catch (error) {
      console.error('❌ Error loading inventory data:', error);
      // Fallback to localStorage if database fails
      const localStorageData = localStorage.getItem('inventoryData');
      if (localStorageData) {
        console.log('🔄 Falling back to localStorage data');
        setInventoryData(JSON.parse(localStorageData));
        setUseDatabase(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadInventoryData();
  }, [currentMonth, useDatabase]);

  // Update quantity in database or localStorage
  const updateQuantity = async (index, newQuantity) => {
    try {
      const currentMonthData = inventoryData[currentMonth] || [];
      if (currentMonthData[index]) {
        const item = currentMonthData[index];
        const itemName = item[0];
        
        if (useDatabase) {
          // Update in database
          const allItems = await dbService.getItemsByMonth(currentMonth);
          const dbItem = allItems.find(i => i.name === itemName);
          
          if (dbItem) {
            await dbService.updateQuantity(dbItem.id, parseInt(newQuantity));
            await loadInventoryData(); // Reload data
          }
        } else {
          // Update in localStorage
          const newData = { ...inventoryData };
          newData[currentMonth][index][3] = parseInt(newQuantity);
          setInventoryData(newData);
          localStorage.setItem('inventoryData', JSON.stringify(newData));
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
      if (useDatabase) {
        // Add to database
        await dbService.addItem({
          name,
          retail: parseFloat(retail),
          cost: parseFloat(cost),
          quantity: parseInt(quantity),
          month: currentMonth,
          category
        });
        
        await loadInventoryData(); // Reload data
      } else {
        // Add to localStorage
        const newData = { ...inventoryData };
        if (!newData[currentMonth]) {
          newData[currentMonth] = [];
        }
        newData[currentMonth].push([name, parseFloat(retail), parseFloat(cost), parseInt(quantity)]);
        setInventoryData(newData);
        localStorage.setItem('inventoryData', JSON.stringify(newData));
      }
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
        
        if (useDatabase) {
          // Delete from database
          const allItems = await dbService.getItemsByMonth(currentMonth);
          const dbItem = allItems.find(i => i.name === itemName);
          
          if (dbItem) {
            await dbService.deleteItem(dbItem.id);
            await loadInventoryData(); // Reload data
          }
        } else {
          // Delete from localStorage
          const newData = { ...inventoryData };
          newData[currentMonth].splice(index, 1);
          setInventoryData(newData);
          localStorage.setItem('inventoryData', JSON.stringify(newData));
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Populate database with localStorage data
  const populateDatabase = async () => {
    try {
      console.log('🚀 Starting database population...');
      const success = await dbService.populateDatabase();
      console.log('✅ Population result:', success);
      
      if (success) {
        console.log('🎉 Database populated successfully!');
        // Reload data to show the populated items
        await loadInventoryData();
      }
    } catch (error) {
      console.error('❌ Error populating database:', error);
    }
  };

  // Toggle between localStorage and database
  const toggleDatabase = () => {
    setUseDatabase(!useDatabase);
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
    useDatabase,
    updateQuantity,
    switchMonth,
    toggleDeleteMode,
    addProduct,
    deleteProduct,
    loadInventoryData,
    populateDatabase,
    toggleDatabase
  };
}; 
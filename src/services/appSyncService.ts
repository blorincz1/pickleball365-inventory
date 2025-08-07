import { generateClient } from 'aws-amplify/api';

// Initialize the AppSync client
const client = generateClient({
  authMode: 'apiKey'
});

export interface InventoryItem {
  id: string;
  name: string;
  retail: number;
  cost: number;
  quantity: number;
  month: number;
  category: string;
}

// GraphQL queries and mutations
const GET_INVENTORY_ITEMS = `
  query GetInventoryItems($month: Int) {
    getInventoryItems(month: $month) {
      id
      name
      retail
      cost
      quantity
      month
      category
    }
  }
`;

const GET_ALL_INVENTORY_ITEMS = `
  query GetAllInventoryItems {
    getAllInventoryItems {
      id
      name
      retail
      cost
      quantity
      month
      category
    }
  }
`;

const CREATE_INVENTORY_ITEM = `
  mutation CreateInventoryItem($name: String!, $retail: Float!, $cost: Float!, $quantity: Int!, $month: Int!, $category: String!) {
    createInventoryItem(name: $name, retail: $retail, cost: $cost, quantity: $quantity, month: $month, category: $category) {
      id
      name
      retail
      cost
      quantity
      month
      category
    }
  }
`;

const UPDATE_INVENTORY_ITEM = `
  mutation UpdateInventoryItem($id: ID!, $quantity: Int!) {
    updateInventoryItem(id: $id, quantity: $quantity) {
      id
      name
      retail
      cost
      quantity
      month
      category
    }
  }
`;

const DELETE_INVENTORY_ITEM = `
  mutation DeleteInventoryItem($id: ID!) {
    deleteInventoryItem(id: $id)
  }
`;

export class AppSyncService {
  async getItemsByMonth(month: number): Promise<InventoryItem[]> {
    try {
      console.log(`🔍 Fetching items for month ${month} from AppSync`);
      
      const response = await client.graphql({
        query: GET_INVENTORY_ITEMS,
        variables: { month }
      });
      
      console.log('✅ AppSync response:', response);
      console.log('📦 Response data:', response.data);
      console.log('📦 getInventoryItems:', response.data.getInventoryItems);
      console.log('📦 Items count:', response.data.getInventoryItems?.length || 0);
      return response.data.getInventoryItems || [];
    } catch (error) {
      console.error('❌ Error getting items by month:', error);
      return [];
    }
  }

  async getAllItems(): Promise<InventoryItem[]> {
    try {
      console.log('🔍 Fetching all items from AppSync');
      
      const response = await client.graphql({
        query: GET_ALL_INVENTORY_ITEMS
      });
      
      console.log('✅ AppSync response:', response);
      return response.data.getAllInventoryItems || [];
    } catch (error) {
      console.error('❌ Error getting all items:', error);
      return [];
    }
  }

  async addItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem | null> {
    try {
      console.log('➕ Adding item to AppSync:', item);
      
      const response = await client.graphql({
        query: CREATE_INVENTORY_ITEM,
        variables: item
      });
      
      console.log('✅ Item added successfully:', response);
      console.log('📦 Create response data:', response.data);
      console.log('📦 Created item:', response.data.createInventoryItem);
      return response.data.createInventoryItem;
    } catch (error) {
      console.error('❌ Error adding item:', error);
      return null;
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<InventoryItem | null> {
    try {
      console.log(`📝 Updating quantity for item ${id} to ${quantity}`);
      
      const response = await client.graphql({
        query: UPDATE_INVENTORY_ITEM,
        variables: { id, quantity }
      });
      
      console.log('✅ Quantity updated successfully:', response);
      return response.data.updateInventoryItem;
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      return null;
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    try {
      console.log(`🗑️ Deleting item ${id}`);
      
      const response = await client.graphql({
        query: DELETE_INVENTORY_ITEM,
        variables: { id }
      });
      
      console.log('✅ Item deleted successfully:', response);
      return response.data.deleteInventoryItem;
    } catch (error) {
      console.error('❌ Error deleting item:', error);
      return false;
    }
  }

  async migrateFromLocalStorage(localStorageData: any): Promise<boolean> {
    try {
      console.log('🚀 Starting migration to AppSync...');
      
      const items: Omit<InventoryItem, 'id'>[] = [];
      
      // Convert localStorage data to AppSync format
      Object.keys(localStorageData).forEach(monthName => {
        const monthIndex = this.getMonthIndex(monthName);
        if (monthIndex !== -1) {
          localStorageData[monthName].forEach((item: any) => {
            items.push({
              name: item[0],
              retail: parseFloat(item[1]),
              cost: parseFloat(item[2]),
              quantity: parseInt(item[3]),
              month: monthIndex,
              category: this.getCategoryForProduct(item[0])
            });
          });
        }
      });

      console.log(`📦 Migrating ${items.length} items to AppSync`);
      
      // Add all items to AppSync
      console.log(`📝 Adding ${items.length} items to AppSync...`);
      for (const item of items) {
        console.log('➕ Adding item:', item);
        const result = await this.addItem(item);
        console.log('✅ Add result:', result);
      }

      console.log('✅ Migration completed successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error migrating from localStorage:', error);
      return false;
    }
  }

  private getMonthIndex(monthName: string): number {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
  }

  private getCategoryForProduct(productName: string): string {
    if (productName.includes('Paddle') || productName.includes('FRANKLIN') || productName.includes('P365 Pickleball Paddle')) {
      return 'Paddles';
    } else if (productName.includes('Shirt') || productName.includes('Skort') || productName.includes('Visor') || productName.includes('Headband')) {
      return 'Apparel';
    } else {
      return 'Accessories';
    }
  }
} 
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../amplify/backend/data/resource';

const client = generateClient<Schema>();

export interface InventoryItem {
  id?: string;
  name: string;
  retail: number;
  cost: number;
  quantity: number;
  month: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export class InventoryService {
  // Get all inventory items for a specific month
  async getInventoryForMonth(month: number): Promise<InventoryItem[]> {
    try {
      const response = await client.models.InventoryItem.list({
        filter: {
          month: { eq: month }
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory for month:', error);
      return [];
    }
  }

  // Get all inventory items
  async getAllInventory(): Promise<InventoryItem[]> {
    try {
      const response = await client.models.InventoryItem.list();
      return response.data;
    } catch (error) {
      console.error('Error fetching all inventory:', error);
      return [];
    }
  }

  // Update quantity for a specific item
  async updateQuantity(id: string, quantity: number): Promise<InventoryItem | null> {
    try {
      const response = await client.models.InventoryItem.update({
        id,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return null;
    }
  }

  // Add new inventory item
  async addInventoryItem(item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<InventoryItem | null> {
    try {
      const response = await client.models.InventoryItem.create(item);
      return response.data;
    } catch (error) {
      console.error('Error adding inventory item:', error);
      return null;
    }
  }

  // Delete inventory item
  async deleteInventoryItem(id: string): Promise<boolean> {
    try {
      await client.models.InventoryItem.delete({ id });
      return true;
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      return false;
    }
  }

  // Migrate data from localStorage to DynamoDB
  async migrateFromLocalStorage(localStorageData: any): Promise<boolean> {
    try {
      const items: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>[] = [];
      
      // Process each month
      for (let month = 0; month < 12; month++) {
        if (localStorageData[month]) {
          localStorageData[month].forEach((item: any) => {
            items.push({
              name: item[0],
              retail: item[1],
              cost: item[2],
              quantity: item[3],
              month,
              category: this.getCategoryForProduct(item[0])
            });
          });
        }
      }

      // Create all items in DynamoDB
      for (const item of items) {
        await this.addInventoryItem(item);
      }

      return true;
    } catch (error) {
      console.error('Error migrating data:', error);
      return false;
    }
  }

  // Helper method to determine category based on product name
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

export const inventoryService = new InventoryService(); 
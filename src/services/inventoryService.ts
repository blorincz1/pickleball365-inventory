import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../../amplify/backend/data/resource';

const client = generateClient<Schema>();

export interface InventoryItem {
  id: string;
  name: string;
  retail: number;
  cost: number;
  quantity: number;
  month: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export class InventoryService {
  static async getInventoryForMonth(month: number): Promise<InventoryItem[]> {
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

  static async getAllInventory(): Promise<InventoryItem[]> {
    try {
      const response = await client.models.InventoryItem.list();
      return response.data;
    } catch (error) {
      console.error('Error fetching all inventory:', error);
      return [];
    }
  }

  static async updateQuantity(id: string, quantity: number): Promise<InventoryItem | null> {
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

  static async addInventoryItem(item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<InventoryItem | null> {
    try {
      const response = await client.models.InventoryItem.create({
        ...item,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error adding inventory item:', error);
      return null;
    }
  }

  static async deleteInventoryItem(id: string): Promise<boolean> {
    try {
      await client.models.InventoryItem.delete({ id });
      return true;
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      return false;
    }
  }

  static async migrateFromLocalStorage(localStorageData: any): Promise<boolean> {
    try {
      const items: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>[] = [];
      
      // Convert localStorage data to database format
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

      // Add all items to database
      for (const item of items) {
        await this.addInventoryItem(item);
      }

      return true;
    } catch (error) {
      console.error('Error migrating from localStorage:', error);
      return false;
    }
  }

  private static getMonthIndex(monthName: string): number {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
  }

  private static getCategoryForProduct(productName: string): string {
    const paddleProducts = ['Paddle A', 'Paddle B', 'Paddle C'];
    const apparelProducts = ['Shirt A', 'Shirt B', 'Shirt C'];
    const accessoryProducts = ['Bag A', 'Bag B', 'Bag C'];

    if (paddleProducts.includes(productName)) return 'Paddles';
    if (apparelProducts.includes(productName)) return 'Apparel';
    if (accessoryProducts.includes(productName)) return 'Accessories';
    
    return 'Other';
  }
} 
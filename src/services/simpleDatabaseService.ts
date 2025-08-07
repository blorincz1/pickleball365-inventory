import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand, UpdateCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

export interface InventoryItem {
  id: string;
  month: number;
  name: string;
  retail: number;
  cost: number;
  quantity: number;
  category: string;
}

export class SimpleDatabaseService {
  private tableName = 'Pickleball365Inventory';

  async createTableIfNotExists(): Promise<void> {
    // This would create the table if it doesn't exist
    // For now, we'll assume the table exists
    console.log('Table creation would happen here');
  }

  async addItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem | null> {
    try {
      const id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const newItem: InventoryItem = {
        ...item,
        id,
      };

      const command = new PutCommand({
        TableName: this.tableName,
        Item: newItem,
      });

      await docClient.send(command);
      return newItem;
    } catch (error) {
      console.error('Error adding item:', error);
      return null;
    }
  }

  async getItemsByMonth(month: number): Promise<InventoryItem[]> {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
        FilterExpression: '#month = :month',
        ExpressionAttributeNames: {
          '#month': 'month',
        },
        ExpressionAttributeValues: {
          ':month': month,
        },
      });

      const response = await docClient.send(command);
      return response.Items as InventoryItem[] || [];
    } catch (error) {
      console.error('Error getting items by month:', error);
      return [];
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<InventoryItem | null> {
    try {
      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: 'SET quantity = :quantity',
        ExpressionAttributeValues: {
          ':quantity': quantity,
        },
        ReturnValues: 'ALL_NEW',
      });

      const response = await docClient.send(command);
      return response.Attributes as InventoryItem || null;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return null;
    }
  }

  async deleteItem(id: string): Promise<boolean> {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      });

      await docClient.send(command);
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  }

           async migrateFromLocalStorage(localStorageData: any): Promise<boolean> {
           try {
             const items: Omit<InventoryItem, 'id'>[] = [];
      
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
        await this.addItem(item);
      }

      return true;
    } catch (error) {
      console.error('Error migrating from localStorage:', error);
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
const { DynamoDBClient, CreateTableCommand, UpdateTableCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' });

async function createTable() {
  try {
    // Create the main table
    const createTableCommand = new CreateTableCommand({
      TableName: 'inventory-items',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      BillingMode: 'PAY_PER_REQUEST',
    });

    console.log('Creating DynamoDB table...');
    await client.send(createTableCommand);
    console.log('✅ Table created successfully!');

    // Wait a bit for the table to be active
    console.log('Waiting for table to be active...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Create a Global Secondary Index for querying by month
    const createIndexCommand = new UpdateTableCommand({
      TableName: 'inventory-items',
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'month', AttributeType: 'N' }
      ],
      GlobalSecondaryIndexUpdates: [
        {
          Create: {
            IndexName: 'month-index',
            KeySchema: [
              { AttributeName: 'month', KeyType: 'HASH' }
            ],
            Projection: {
              ProjectionType: 'ALL'
            }
          }
        }
      ]
    });

    console.log('Creating month index...');
    await client.send(createIndexCommand);
    console.log('✅ Month index created successfully!');

  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('✅ Table already exists!');
    } else {
      console.error('❌ Error creating table:', error);
    }
  }
}

createTable(); 
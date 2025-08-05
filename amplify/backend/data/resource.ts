import { defineData } from '@aws-amplify/backend';
import { type ClientSchema, a } from '@aws-amplify/amplify-api-next-alpha';

const schema = a.schema({
  InventoryItem: a.model({
    id: a.id(),
    name: a.string(),
    retail: a.float(),
    cost: a.float(),
    quantity: a.integer(),
    month: a.integer(),
    category: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
  }),
  User: a.model({
    id: a.id(),
    username: a.string(),
    email: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
}); 
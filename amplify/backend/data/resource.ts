import { defineData } from '@aws-amplify/backend';

export const data = defineData({
  schema: `
    type InventoryItem @model @auth(rules: [{ allow: owner }]) {
      id: ID!
      name: String!
      retail: Float!
      cost: Float!
      quantity: Int!
      month: Int!
      category: String!
      createdAt: AWSDateTime!
      updatedAt: AWSDateTime!
    }
  `,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
}); 
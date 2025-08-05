import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || '',
      loginWith: {
        username: true,
        email: false,
        phone: false,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '',
      region: process.env.REACT_APP_REGION || 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
}); 
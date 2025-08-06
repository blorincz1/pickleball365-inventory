import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_joUwNZgTn',
      userPoolClientId: '1v6pogfvgv5g7gha081jl6pn5h',
      loginWith: {
        username: false,
        email: true,
        phone: false,
      },
    },
    region: 'us-east-1',
  },
  API: {
    GraphQL: {
      endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || '',
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
}); 
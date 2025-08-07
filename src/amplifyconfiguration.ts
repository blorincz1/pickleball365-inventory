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
      endpoint: "https://3ly6wdb4ujehteovefrkakvuhi.appsync-api.us-east-1.amazonaws.com/graphql",
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-hzx7jwfprzcb7nuhilm2sx2xjq',
    },
  },
}); 
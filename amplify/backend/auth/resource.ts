import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: false,
    username: true,
    phone: false,
  },
  userAttributes: {
    email: {
      required: true,
    },
  },
}); 
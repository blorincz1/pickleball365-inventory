import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    username: true,
    email: true, // <-- enable email
    phone: false,
  },
  userAttributes: {
    email: {
      required: true,
    },
  },
});
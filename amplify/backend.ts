import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.ts';

export const backend = defineBackend({
  auth
}); 
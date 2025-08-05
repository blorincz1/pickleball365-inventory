# Pickleball 365 Inventory - AWS Deployment Guide

## Phase 2: AWS Amplify Deployment

### Prerequisites
1. AWS CLI installed and configured
2. AWS Amplify CLI installed
3. AWS account with appropriate permissions

### Step 1: Initialize Amplify Backend
```bash
cd /Users/boblorincz/Repos/inventory-mgmt/inventory-app
amplify init
```

### Step 2: Add Authentication
```bash
amplify add auth
```
Choose:
- Default configuration
- Username sign-in
- No additional settings

### Step 3: Add API (GraphQL)
```bash
amplify add api
```
Choose:
- GraphQL
- Amazon DynamoDB
- Single object with fields
- Use schema from file: `amplify/backend/data/resource.ts`

### Step 4: Deploy Backend
```bash
amplify push
```

### Step 5: Configure Frontend
1. Update environment variables in `.env` file with the generated values
2. Test authentication locally

### Step 6: Deploy Frontend
```bash
amplify publish
```

### Step 7: Configure Custom Domain
1. Add custom domain in Amplify Console
2. Update DNS records for `inventory.pickleball365.net`
3. Configure SSL certificate

### Step 8: Data Migration
1. Export current localStorage data
2. Use the migration service to populate DynamoDB
3. Verify data integrity

### Environment Variables Needed
Create a `.env` file with:
```
REACT_APP_USER_POOL_ID=<from_amplify_output>
REACT_APP_USER_POOL_CLIENT_ID=<from_amplify_output>
REACT_APP_GRAPHQL_ENDPOINT=<from_amplify_output>
REACT_APP_REGION=us-east-1
```

### User Creation
After deployment, create users in AWS Cognito:
1. Go to AWS Cognito Console
2. Find your User Pool
3. Create users with usernames and temporary passwords
4. Users will be prompted to change password on first login

### Next Steps
1. Test the application with authentication
2. Migrate existing data from localStorage
3. Configure custom domain
4. Set up monitoring and alerts 
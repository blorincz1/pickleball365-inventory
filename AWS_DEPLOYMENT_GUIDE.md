# Pickleball 365 Inventory - AWS Deployment Guide

## 🚀 **Phase 2: AWS Deployment**

Your React app is now built and ready for deployment! Here's how to deploy it to AWS with authentication and custom domain.

### **📦 What's Ready:**
- ✅ React app built successfully (`build/` folder)
- ✅ Deployment package created (`inventory-app.zip`)
- ✅ Authentication components ready
- ✅ DynamoDB schema defined
- ✅ Custom domain configuration ready

---

## **🎯 Deployment Options:**

### **Option A: AWS Amplify Console (Recommended)**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose "GitHub" or "Upload file"
4. Upload the `inventory-app.zip` file
5. Configure build settings (not needed for static build)
6. Deploy!

### **Option B: AWS S3 + CloudFront**
1. Create S3 bucket for hosting
2. Upload `build/` contents to S3
3. Configure S3 for static website hosting
4. Create CloudFront distribution
5. Point custom domain to CloudFront

### **Option C: AWS Amplify CLI (Alternative)**
If the CLI issues are resolved:
```bash
amplify init
amplify add auth
amplify add api
amplify push
amplify publish
```

---

## **🔐 Authentication Setup:**

### **AWS Cognito User Pool:**
1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Create User Pool named "Pickleball365Inventory"
3. Configure:
   - Username sign-in (not email)
   - Email required
   - Password requirements: 8+ characters
4. Create app client
5. Note the User Pool ID and Client ID

### **Create Users:**
1. In Cognito Console, go to "Users and groups"
2. Click "Create user"
3. Add usernames and temporary passwords
4. Users will change password on first login

---

## **🗄️ Database Setup:**

### **DynamoDB Table:**
1. Go to [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
2. Create table: "Pickleball365Inventory"
3. Partition key: `id` (String)
4. Sort key: `month` (Number)
5. Enable point-in-time recovery

### **Data Migration:**
1. Export current localStorage data
2. Use AWS CLI or console to import data
3. Verify data integrity

---

## **🌐 Custom Domain Setup:**

### **Domain Configuration:**
1. In Amplify Console, go to "Domain management"
2. Add custom domain: `inventory.pickleball365.net`
3. Verify domain ownership
4. Configure SSL certificate (automatic)

### **DNS Records:**
Add these records to your domain provider:
```
Type: CNAME
Name: inventory
Value: [Amplify-provided domain]
TTL: 300
```

---

## **⚙️ Environment Variables:**

Create `.env` file in your project:
```env
REACT_APP_USER_POOL_ID=us-east-1_xxxxxxxxx
REACT_APP_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_GRAPHQL_ENDPOINT=https://xxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
REACT_APP_REGION=us-east-1
```

---

## **📋 Next Steps:**

1. **Choose deployment method** (Amplify Console recommended)
2. **Set up authentication** in AWS Cognito
3. **Create database** in DynamoDB
4. **Configure custom domain**
5. **Migrate existing data**
6. **Test the application**

---

## **🔧 Troubleshooting:**

### **If Amplify CLI fails:**
- Use AWS Console instead
- Check AWS account billing status
- Verify IAM permissions

### **If build fails:**
- Check for missing dependencies
- Verify TypeScript configuration
- Clear node_modules and reinstall

### **If authentication doesn't work:**
- Verify Cognito configuration
- Check environment variables
- Test with AWS Amplify sandbox

---

## **📞 Support:**

- AWS Amplify Documentation: https://docs.amplify.aws/
- AWS Cognito Documentation: https://docs.aws.amazon.com/cognito/
- AWS DynamoDB Documentation: https://docs.aws.amazon.com/dynamodb/

---

**Ready to deploy? Choose your preferred method and let's get your inventory app live on AWS! 🚀** 
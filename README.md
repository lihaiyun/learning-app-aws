# learning-api-lambda

# Serverless Framework Documentation
https://www.serverless.com/framework/docs/getting-started

# Install AWS CLI
https://aws.amazon.com/cli/

# Configure AWS IAM user
aws configure  
aws sts get-caller-identity  

# Install Node.js
https://nodejs.org  
node --version  

# Install serverless
npm install -g serverless  
serverless update  
serverless --version  

# Login severless user
serverless login  
https://app.serverless.com/  

# Create a New Serverless Project
serverless
> Template: AWS / Node.js / HTTP API  
> Project: learning-api  
> App: learning-app  

# Deploy a Service
cd learning-api  
serverless deploy  
serverless deploy --stage prod  

# Developing
serverless dev  

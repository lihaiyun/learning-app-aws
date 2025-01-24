# IAM
> create policy MyLambdaDynamoDBExecutionPolicy  

> create role MyLambdaDynamoDBExecutionRole

# Lambda
> create function  
>> name: workshop-nodejs-hello  
>> runtime: Node.js 2x.x  
>> execution role: existing role MyLambdaDynamoDBExecutionRole  

# API Gateway
> create API  
>> type: HTTP API  
>> name: workshop-nodejs-api  
>> copy the default endpoint:  
>> https://{api-gateway-id}.execute-api.{region}.amazonaws.com  

> create route  
>> method: GET, path: /  

> attach integration to the route  
>> type: lambda function  
>> lambda function: workshop-nodejs-hello  

# Postman
> create environment workshop-nodejs-api  
>> add variable baseUrl  
>> value: API default endpoint  
>> select the environment

> create collection workshop-courses  
>> add request: Hello
>> method: GET, path: {{baseUrl}}
>> test the endpoint

# Lambda
> go to function workshop-nodejs-hello  
>> observe that the trigger is API Gateway  
>> Monitor: View CloudWatch logs  

# CloudWatch
> Log group: /aws/lambda/workshop-nodejs-hello  
>> view log steams  

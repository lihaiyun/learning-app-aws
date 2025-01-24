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
>> e.g. https://{api-gateway-id}.execute-api.{region}.amazonaws.com  

> create route  
>> method: GET, path: /  

> attach integration to the route  
>> type: lambda function  
>> lambda function: workshop-nodejs-hello  

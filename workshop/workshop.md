# IAM
> create policy MyLambdaDynamoDBExecutionPolicy  
> create role MyLambdaDynamoDBExecutionRole

# Lambda
> create function  
> Name: workshop-nodejs-hello  
> Runtime: Node.js 2x.x  
> Execution role: Existing role MyLambdaDynamoDBExecutionRole  

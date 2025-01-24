# DynamoDB
> create table  
>> name: workshop-courses  
>> partition key: courseId / String  

> create index for the table  
>> partition key: courseDomain / String  
>> sort key: createdAt / String  
>> index name: courseDomainIndex  

# Lambda
> create function workshop-nodejs-addCourse
>> environment variable: COURSES_TABLE = workshop-courses  
>> edit code and deploy

# API Gateway
> create route for the API  
>> method: POST, path: /courses  

> attach integration to the route  
>> type: lambda function  
>> lambda function: workshop-nodejs-addCourse  

# Postman
> add request: Add Course
>> test to trigger the lambda function  

# DynamoDB
> Explore items in the table workshop-courses  
>> observe that new item is added  

# Complete all lambda functions (CRUD)
> addCourse (PutItem)  
> getCourseList (Scan)  
> getCourseListByDomain (Query)  
> getCourse (GetItem)  
> updateCourse (UpdateItem)  
> deleteCourse (DeleteItem)  

# Code in Python
> same DynamoDB  
> new Lambda functions: workshop-python-xxx  
> new API Getway: workshop-python-api  

# Challenges
> Lambda Layer  
>> create layer for the package nanoid  
>> use the layer in the function addCourse to generate id

> New Lambda Function  
>> name: exportCourseList  
>> get the selected month from the query (by default is last month)  
>> get the new courses created during the selected month  
>> export the data to csv and save to S3 bucket  

> EventBridge
>> create scheduler to trigger the lambda function exportCourseList

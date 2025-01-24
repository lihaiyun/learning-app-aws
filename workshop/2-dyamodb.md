# DynamoDB
> create table  
>> name: workshop-courses  
>> partition key: courseId / String  

> create index for the table  
>> partition key: courseDomain / String  
>> sort key: createdAt / String  
>> index name: courseDomainIndex  

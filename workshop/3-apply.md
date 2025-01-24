# Phone Shop API
> Develop your phone shop API (CRUD)  
> Phone attributes  
>> phoneId  
>> phoneName  
>> phoneNameLower (for search)  
>> brand  
>> description  
>> price  
>> releaseDate  
>> createdAt  
>> updatedAt  

# Challenges
> Lambda Layer  
>> create layer for the package nanoid  
>> use the layer in the function addPhone to generate id

> New Lambda Function  
>> name: exportPhoneList  
>> get the selected year from the query (by default is last year)  
>> get the new phones released during the selected year  
>> export the data to csv and save to S3 bucket  

> EventBridge
>> create scheduler to trigger the lambda function exportPhoneList yearly in Jan

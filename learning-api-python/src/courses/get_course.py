import boto3
import os
import json

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # get course id from path parameters
    courseId = event.get("pathParameters", {}).get("courseId")
    
    try:
        # get item from DynamoDB
        db_response = table.get_item(Key={"courseId": courseId})
        item = db_response.get("Item")
        # convert Decimal to float
        item["rating"] = float(item["rating"])
        response = {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps(item)
        }
    except Exception as e:
        print(f'Error: {e}') # log the error
        response = {
            "statusCode": 500,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Failed to get course"})
        }
    return response
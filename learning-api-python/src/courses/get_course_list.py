import boto3
import os
import json

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # scan data from DynamoDB
    try:
        response = table.scan()
        courses = response.get("Items", [])
        json_data = json.dumps(courses, default=str)
        print(json_data)
        response = {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json_data
        }
    except Exception as e:
        print(f'Error: {e}') # log the error
        response = {
            "statusCode": 500,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Failed to get course list"})
        }
    return response
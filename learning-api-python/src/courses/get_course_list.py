import boto3
import os
import json

def handler(event, context):
    # get course list from DynamoDB
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))
    response = table.scan()
    courses = response.get("Items", [])

    # return response
    response = {
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": json.dumps(courses)
    }
    return response
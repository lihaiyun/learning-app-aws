import boto3
import os
import json

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # get course domain from path parameters
    courseDomain = event.get("pathParameters", {}).get("courseDomain")

    try:
        # query data from DynamoDB
        response = table.query(
            IndexName="courseDomainIndex",
            KeyConditionExpression="courseDomain = :courseDomain",
            ExpressionAttributeValues={":courseDomain": courseDomain},
            ScanIndexForward=False # sort by createdAt in descending order
        )
        # get course list from response
        courses = response.get("Items", [])
        # convert Decimal to float
        for course in courses:
            course["rating"] = float(course["rating"])

        response = {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps(courses)
        }
    except Exception as e:
        print(f'Error: {e}') # log the error
        response = {
            "statusCode": 500,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Failed to get course list"})
        }
    return response
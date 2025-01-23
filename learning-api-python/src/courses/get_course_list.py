import boto3
import os
import json

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # get search value from query string parameters
    query = event.get("queryStringParameters", {})
    search = query.get("search")

    try:
        # scan data from DynamoDB
        if search:
            response = table.scan(
                FilterExpression="contains(courseNameLower, :search)",
                ExpressionAttributeValues={":search": search.lower()}
            )
        else:
            response = table.scan()

        # get course list from response
        courses = response.get("Items", [])
        # convert Decimal to float
        for course in courses:
            course["rating"] = float(course["rating"])
        # sort course list by createdAt
        courses.sort(key=lambda x: x["createdAt"], reverse=True)

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
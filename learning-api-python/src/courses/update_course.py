import boto3
import os
from datetime import datetime
from decimal import Decimal
import json

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # get course id from path parameters
    courseId = event.get("pathParameters", {}).get("courseId")

    # get data from event body
    data = json.loads(event["body"])

    try:
        # update item in DynamoDB
        db_response = table.update_item(
            Key={"courseId": courseId},
            UpdateExpression="""
                SET courseName = :courseName,
                    courseNameLower = :courseNameLower,
                    courseDomain = :courseDomain,
                    description = :description,
                    instructor = :instructor,
                    rating = :rating,
                    updatedAt = :updatedAt
            """,
            ExpressionAttributeValues={
                ":courseName": data["courseName"],
                ":courseNameLower": data["courseName"].lower(),
                ":courseDomain": data["courseDomain"],
                ":description": data["description"],
                ":instructor": data["instructor"],
                ":rating": Decimal(str(data["rating"])),
                ":updatedAt": datetime.now().isoformat()
            },
            # ensure the item exists
            ConditionExpression="attribute_exists(courseId)"
        )
        print(f"DB Response: {db_response}") # log the response

        response = {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Course updated"})
        }
    except Exception as e:
        if "ConditionalCheckFailedException" in str(e):
            response = {
                "statusCode": 404,
                "headers": { "Content-Type": "application/json" },
                "body": json.dumps({"message": "Course not found"})
            }
        else:
            print(f'Error: {e}') # log the error
            response = {
                "statusCode": 500,
                "headers": { "Content-Type": "application/json" },
                "body": json.dumps({"message": "Failed to update course"})
            }
    return response
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
        # delete item from DynamoDB
        db_response = table.delete_item(
            Key={"courseId": courseId},
            # ensure the item exists
            ConditionExpression="attribute_exists(courseId)"
        )
        print(f"DB Response: {db_response}") # log the response

        response = {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Course deleted"})
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
                "body": json.dumps({"message": "Failed to delete course"})
            }
    return response
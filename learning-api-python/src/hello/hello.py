import os
import json

def handler(event, context):
    # get name from query string parameters
    query = event.get("queryStringParameters", {})
    name = query.get("name", "World")

    # get stage from environment variables
    STAGE = os.getenv("STAGE", "dev")

    # return response
    body = {
        "message": f"Hello {name}!",
        "stage": STAGE
    }
    response = {
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": json.dumps(body)
    }
    return response
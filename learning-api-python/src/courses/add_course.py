import boto3
import os
import time
import random
from datetime import datetime
from decimal import Decimal
import json

def generate_id():
    # get the current timestamp in seconds
    timestamp = int(time.time())
    #convert the timestamp to hexadecimal
    uid = hex(timestamp)[2:]
    # generate random bytes and convert to hexadecimal
    rand = hex(random.getrandbits(24))[2:]
    # concatenate the two values
    return f"{uid}-{rand}"

def handler(event, context):
    # get DynamoDB table
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(os.getenv("COURSES_TABLE"))

    # get data from event body
    data = json.loads(event["body"])
    now = datetime.now().isoformat()
    item = {
        "courseId": generate_id(),
        "courseName": data["courseName"],
        "courseNameLower": data["courseName"].lower(),
        "courseDomain": data["courseDomain"],
        "description": data["description"],
        "instructor": data["instructor"],
        "rating": Decimal(str(data["rating"])),
        "createdAt": now,
        "updatedAt": now
    }
    
    # put item in DynamoDB
    try:
        table.put_item(Item=item)
        json_data = json.dumps(item, default=str)
        print(json_data)
        response = {
            "statusCode": 201,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps(json_data)
        }
    except Exception as e:
        print(f'Error: {e}') # log the error
        response = {
            "statusCode": 500,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps({"message": "Failed to add course"})
        }
    return response
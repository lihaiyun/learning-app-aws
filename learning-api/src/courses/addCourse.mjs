import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

function generateId() {
  // Get the current timestamp in seconds
  const timestamp = Math.floor(new Date().getTime() / 1000);

  // Convert timestamp to hexadecimal string
  const hexTimestamp = timestamp.toString(16);

  // Generate random bytes and convert to hexadecimal
  const hexRandom = crypto.randomBytes(4).toString('hex');

  // Combine the timestamp and random part
  return `${hexTimestamp}-${hexRandom}`;
}

export const handler = async (event) => {
  // get data from event body
  const data = JSON.parse(event.body);
  // avoid to use reserved words like name, type, domain, status
  const item = {
    courseId: generateId(),
    courseName: data.courseName,
    courseNameLower: data.courseName.toLowerCase(),
    courseDomain: data.courseDomain,
    description: data.description,
    instructor: data.instructor,
    duration: data.duration,
    createdAt: new Date().toISOString()
  }

  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE,
    Item: item,
    // avoid to overwrite existing item
    ConditionExpression: 'attribute_not_exists(courseId)'
  };

  // save data to DynamoDB
  try {
    const command = new PutCommand(params);
    const response = await docClient.send(command);
    console.log(response);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    };
  }
  catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Failed to add course' })
    };
  }
};

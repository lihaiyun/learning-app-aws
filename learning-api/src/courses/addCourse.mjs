import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // get data from event body
  const data = JSON.parse(event.body);
  const item = {
    id: randomUUID(),
    name: data.name,
    description: data.description,
    instructor: data.instructor,
    duration: data.duration,
    createdAt: new Date().toISOString()
  }

  // add data to DynamoDB
  const command = new PutCommand({
    TableName: process.env.COURSES_TABLE,
    Item: item
  });
  const response = await docClient.send(command);
  console.log(response);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  };
};

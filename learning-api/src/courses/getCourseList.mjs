import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function handler(event) {
  const params = {
    TableName: process.env.COURSES_TABLE
  }
  const command = new ScanCommand(params);
  const response = await docClient.send(command);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(response.Items)
  };
}
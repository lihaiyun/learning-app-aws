import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // get data from DynamoDB
  const command = new ScanCommand({
    TableName: process.env.COURSES_TABLE
  });
  const response = await docClient.send(command);
  console.log(response);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Items)
  };
};

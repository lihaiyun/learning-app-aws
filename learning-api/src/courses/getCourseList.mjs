import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE,
    IndexName: "createdAtIndex", // sort by created time
    ScanIndexForward: false, // descending order (latest first)
  };

  // query data from DynamoDB
  const command = new QueryCommand(params);
  const response = await docClient.send(command);
  console.log(response);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Items)
  };
};

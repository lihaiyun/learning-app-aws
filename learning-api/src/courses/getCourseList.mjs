import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE
  };

  // search by name (if provided, case-insensitive)
  const query = event.queryStringParameters;
  if (query && query.search) {
    params.FilterExpression = "contains(courseNameLower, :search)";
    params.ExpressionAttributeValues = {
      ":search": query.search.toLowerCase() 
    };
  }

  // get data from DynamoDB
  const command = new ScanCommand(params);
  const response = await docClient.send(command);
  console.log(response);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Items)
  };
};

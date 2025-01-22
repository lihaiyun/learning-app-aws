import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE
  };

  // search data if query is provided
  const query = event.queryStringParameters;
  if (query && query.search) {
    const search = query.search.toLowerCase();
    params.FilterExpression = 'contains(courseNameLower, :search)';
    params.ExpressionAttributeValues = { ':search': search };
  }

  try {
    // query data from DynamoDB
    const command = new ScanCommand(params);
    const response = await docClient.send(command);

    // sort the list by createdAt (descending)
    let items = response.Items;
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items)
    };
  }
  catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: 'Failed to get course list' })
    };
  }
};

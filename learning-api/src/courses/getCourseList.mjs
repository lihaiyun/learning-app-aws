import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const query = event.queryStringParameters;
  const domain = query && query.domain ? query.domain : 'ALL';

  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE,
    IndexName: "courseDomainIndex",
    KeyConditionExpression: "courseDomain = :domain",
    ExpressionAttributeValues: {
      ":domain": domain
    },
    ScanIndexForward: false, // descending order (latest first)
  };

  try {
    // query data from DynamoDB
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.Items)
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

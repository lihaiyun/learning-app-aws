import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // get course domain from path parameters
  const courseDomain = event.pathParameters.courseDomain;

  // set command parameters for query
  let params = {
    TableName: process.env.COURSES_TABLE,
    IndexName: 'courseDomainIndex',
    KeyConditionExpression: 'courseDomain = :courseDomain',
    ExpressionAttributeValues: { ':courseDomain': courseDomain },
    ScanIndexForward: false // sort by createdAt (descending)
  };

  try {
    // query data from DynamoDB
    const command = new QueryCommand(params);
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
      body: JSON.stringify({ message: 'Failed to get course list by domain' })
    };
  }
};

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient, 
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
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
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // get data from event body
  const data = JSON.parse(event.body);
  // avoid to use reserved words like name, type, status
  const item = {
    courseId: randomUUID(),
    courseName: data.courseName,
    courseNameLower: data.courseName.toLowerCase(),
    description: data.description,
    instructor: data.instructor,
    duration: data.duration,
    createdAt: new Date().toISOString()
  }

  // set command parameters
  let params = {
    TableName: process.env.COURSES_TABLE,
    Item: item
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

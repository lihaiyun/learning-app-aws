import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // get course id from path parameters
  const courseId = event.pathParameters.courseId;

  // get data from event body
  const data = JSON.parse(event.body);

  // set command parameters
  const params = {
    TableName: process.env.COURSES_TABLE,
    Key: {
      courseId: courseId
    },
    UpdateExpression: `
          SET 
            courseName = :courseName,
            courseNameLower = :courseNameLower,
            courseDomain = :courseDomain,
            description = :description,
            instructor = :instructor,
            rating = :rating,
            updatedAt = :updatedAt
        `,
    ExpressionAttributeValues: {
      ":courseName": data.courseName,
      ":courseNameLower": data.courseName.toLowerCase(),
      ":courseDomain": data.courseDomain,
      ":description": data.description,
      ":instructor": data.instructor,
      ":rating": data.rating,
      ":updatedAt": new Date().toISOString()
    },
    // ensure the item exists
    ConditionExpression: "attribute_exists(courseId)"
  };

  // update data in DynamoDB
  try {
    const command = new UpdateCommand(params);
    const response = await docClient.send(command);
    console.log(response);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Course updated" }),
    };
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Course not found" }),
      };
    } else {
      console.error(err);
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Failed to update course" }),
      };
    }
  }
};

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // get course id from path parameters
    const courseId = event.pathParameters.courseId;
    
    // set command parameters
    let params = {
        TableName: process.env.COURSES_TABLE,
        Key: {
          courseId: courseId
        },
        // ensure the item exists
        ConditionExpression: "attribute_exists(courseId)"
    };
    
    try {
        // delete data from DynamoDB
        const command = new DeleteCommand(params);
        const response = await docClient.send(command);
        console.log(response);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Course deleted" }),
        };
    }
    catch (err) {
        if (err.name === "ConditionalCheckFailedException") {
            return {
                statusCode: 404,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: 'Course not found' })
            };
        }
        else {
            console.error(err);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: 'Failed to delete course' })
            };
        }
    }
};
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // get course id from path parameters
    const courseId = event.pathParameters.courseId;
    
    // set command parameters
    let params = {
        TableName: process.env.COURSES_TABLE,
        Key: { courseId }
    };
    
    // get data from DynamoDB
    const command = new GetCommand(params);
    const response = await docClient.send(command);
    console.log(response);

    if (response.Item) {
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response.Item)
        };
    }
    else {
        return {
            statusCode: 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Course not found' })
        };
    }
};
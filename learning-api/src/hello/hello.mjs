export const handler = async (event) => {
  // get query parameters from event
  const query = event.queryStringParameters;
  const name = query && query.name ? query.name : "World";

  // get stage from environment variables
  const STAGE = process.env.STAGE;

  // return response
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Hello ${name}!`,
      stage: STAGE
    })
  };
};

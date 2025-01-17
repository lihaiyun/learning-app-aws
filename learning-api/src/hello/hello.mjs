export const handler = async (event) => {
  // get query parameters from event
  const query = event.queryStringParameters;
  const name = query && query.name ? query.name : "world";
  // get stage from environment variables
  const STAGE = process.env.STAGE;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `Hello ${name}!`,
      stage: STAGE
    })
  };
};

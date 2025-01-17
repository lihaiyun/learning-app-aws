export const handler = async (event) => {
  const params = event.queryStringParameters;
  const name = params && params.name ? params.name : "world";
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

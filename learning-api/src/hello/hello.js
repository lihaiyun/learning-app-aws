exports.handler = async (event) => {
  let params = event.queryStringParameters;
  let name = params && params.name ? params.name : "world";
  
  const STAGE = process.env.STAGE;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Hello ${name}!`,
      stage: STAGE
    })
  };
};

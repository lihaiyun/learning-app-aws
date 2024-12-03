exports.hello = async (event) => {
  let params = event.queryStringParameters;
  let name = params && params.name ? params.name : "world";
  
  const STAGE = process.env.STAGE;
  const TABLE_NAME_PREFIX = process.env.TABLE_NAME_PREFIX;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Hello ${name}!`,
      stage: STAGE,
      tableNamePrefix: TABLE_NAME_PREFIX
    })
  };
};

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { lat, lon } = event.queryStringParameters;
  const apiURL = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

  try {
    const apiRes = await fetch(apiURL);
    const data = await apiRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};

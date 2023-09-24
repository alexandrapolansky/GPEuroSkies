const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { lat, lon } = event.queryStringParameters;

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Latitude and Longitude are required.' })
    };
  }

  const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API Response: ${response.statusText}`);
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Function Error: ${error.message}` })
    };
  }
};

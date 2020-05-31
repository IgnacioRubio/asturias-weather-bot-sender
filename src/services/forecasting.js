const request = require('superagent');

// environment variables
const DB_URL_API = process.env.DB_URL_API;

const DB_ENPOINT = '/forecastings/';


// *** DB METHOD ***
exports.getFromDB = async () => {
  try {
    const URL = DB_URL_API + DB_ENPOINT;

    const res = await request.get(URL);
    const forecastings = JSON.parse(res.text);

    return forecastings;

  } catch (err) {
    console.error(err);
  }
}

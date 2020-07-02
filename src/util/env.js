try {
  if (process.env.DB_URL_API === undefined) throw new Error("Enviroment variable 'DB_URL_API' not defined.");
  if (process.env.TW_CONSUMER_KEY === undefined) throw new Error("Enviroment variable 'TW_CONSUMER_KEY' not defined.");
  if (process.env.TW_CONSUMER_SECRET === undefined) throw new Error("Enviroment variable 'TW_CONSUMER_SECRET' not defined.");
  if (process.env.TW_TOKEN_KEY === undefined) throw new Error("Enviroment variable 'TW_TOKEN_KEY' not defined.");
  if (process.env.TW_TOKEN_SECRET === undefined) throw new Error("Enviroment variable 'TW_TOKEN_SECRET' not defined.");
  if (process.env.EMAIL_HOST === undefined) throw new Error("Enviroment variable 'EMAIL_HOST' not defined.");
  if (process.env.EMAIL_PORT === undefined) throw new Error("Enviroment variable 'EMAIL_PORT' not defined.");
  if (process.env.EMAIL_AUTH_USER === undefined) throw new Error("Enviroment variable 'EMAIL_AUTH_USER' not defined.");
  if (process.env.EMAIL_AUTH_PASS === undefined) throw new Error("Enviroment variable 'EMAIL_AUTH_PASS' not defined.");
  if (process.env.EMAIL_MSG_FROM === undefined) throw new Error("Enviroment variable 'EMAIL_MSG_FROM' not defined.");
  if (process.env.EMAIL_MSG_TO === undefined) throw new Error("Enviroment variable 'EMAIL_MSG_TO' not defined.");

} catch (err) {
  throw err;
}

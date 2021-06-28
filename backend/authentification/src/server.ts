//Create App with options
import app from './app';
require("dotenv").config();

// const appId = 1111;
const appId = process.env.APPID;

app.listen(appId, () => {
  return console.log(`server is listening on ${appId}`);
});


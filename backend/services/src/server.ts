//Create App with options
import server from './app';
require("dotenv").config();
// ajout de socket.io

// const appId = 1111;
const appId = process.env.APPID;

server.listen(appId, () => {
  return console.log(`server is listening on ${appId}`);
});


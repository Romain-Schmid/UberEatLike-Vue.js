const http = require('http');
const app = require('./app');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admindelamortquitue:alJxSUPZrlWfkyRM@rfc.axt5d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
        console.log("Le Serveur est connecté mon bro")
  client.close();
});


app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
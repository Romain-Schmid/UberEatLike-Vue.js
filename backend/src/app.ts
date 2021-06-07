import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});


const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Le Serveur est connecté mon bro');
});

app.get('/api/fonction/1', (req, res) => {
  res.status(200).json(res)
  res.json({
    response : "true"
  })
})
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
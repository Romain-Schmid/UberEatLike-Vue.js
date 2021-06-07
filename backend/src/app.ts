import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});

const sensors = [
  {id:1, type:'alpha', datas:[1,2,3]},
  {id:2, type:'beta', datas:[1,2,3], metrics:false},
   {id:3, type:'omega', datas:{a:1,b:2}},
]

const app = express();
const port = 3000;

app
.get('/', (req, res) => {
  res.send('Le Serveur est connecté mon bro');
})
.get('/RomainBG', (req, res) => {
  res.send('Quel frappe');
})
.get('/api/fonction/1', (req, res) => {
  res.sendStatus(200)
})
.get('/api/fonction/2/:id', (req, res) => {
  var id = parseInt(req.params.id)-1
  res.send(sensors[id])
  res.sendStatus(200)
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
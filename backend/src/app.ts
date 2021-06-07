import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

const sensorSchema = new mongoose.Schema({
  id: Number,
  type : String,
  data : [String]
});

const Sensor = mongoose.model('Sensor', sensorSchema);


const app = express();
const port = 3000;
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: true })

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
  if (typeof sensors[id] === "undefined"){
    res.sendStatus(404)
  }
  else{
    res.send(sensors[id])
  }
});

app.post('/api/fonction/3', urlencodedParser, (req, res) => {
  const createSensor = new Sensor({
    id : req.body.id,
    type : req.body.type,
    data : req.body.data
  })
  createSensor.save()
  .then(() => res.status(201).json({ message: 'Objet add succesfully !'}))		
  .catch(error => res.status(400).json({ error }));
});

app.delete('/api/fonction/4/', urlencodedParser, (req, res) => {
  const deleteSensor = { id: req.body.id};
	Sensor.deleteMany(deleteSensor)
  .then(() => res.status(201).json({ message: 'Objet delete !'}))		
  .catch(error => res.status(400).json({ error }));
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
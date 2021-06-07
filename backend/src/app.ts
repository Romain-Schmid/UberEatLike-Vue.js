import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Sensor from './models/sensor_models';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});


const app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app
.get('/', (req, res) => {
  res.send('Le Serveur est connecté mon bro');
})
.get('/api/fonction/getAll', (req, res) => {
  Sensor.countDocuments()
  .then(Sensor => {
    res.status(200).send("Nous avons " + Sensor + " capteur(s) dans notre BDD")
  })
  .catch(error => res.status(400).json({ error }));
})
.get('/api/fonction/get/:id', (req, res) => {
  var idSensor = parseInt(req.params.id)
  Sensor.find({id : idSensor })
  .then(Sensor => {
    if(Sensor.length != 0){
      console.log("then")
      res.status(200).json(Sensor)
    }
    else {
      res.status(400).send("L'id ne correspond à aucun capteur dans la BDD")
    }

  })
});

app.post('/api/fonction/add', urlencodedParser, (req, res) => {
  const createSensor = new Sensor({
    id : req.body.id,
    type : req.body.type,
    data : req.body.data
  })
  createSensor.save()
  .then(() => res.status(201).json({ message: 'Objet add succesfully !'}))		
  .catch(error => res.status(400).json({ error }));
});

app.delete('/api/fonction/delete/', urlencodedParser, (req, res) => {
  const deleteSensor = { id: req.body.id};
	Sensor.deleteMany(deleteSensor)
  .then(() => res.status(200).json({ message: 'Objet delete !'}))		
  .catch(error => res.status(400).json({ error }));
});

app.put('/api/fonction/edit/:id', urlencodedParser, (req, res) => {
  const filter = {id : parseInt(req.params.id)}
  const update = { type : req.body.type, data : req.body.data }
  Sensor.findOneAndUpdate(filter, update)
  .then(Sensor => res.status(202).json({message : "Edit Succesfully"}))
  .catch(error => res.status(400).json({ error }));
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
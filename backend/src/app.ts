import express from 'express';
<<<<<<< Updated upstream
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Sensor from './models/sensor_models';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});

=======
import {Sensor} from './db';
>>>>>>> Stashed changes

const app = express();
const port = 3000;
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: true })

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
<<<<<<< Updated upstream
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
=======
.get('/api/fonction/2/:id', (req, res) => {
  var findSensor =  Sensor.find({id: req.params.id});

  findSensor.exec(function(err,result){
    if(err)
      res.status(400).json({ err });
      
    if(Object.keys(result).length === 0)
      res.status(400).json({ message: "This sensor doesn't exist in the database" });
    
    res.status(201).json({ message: result})
  });
>>>>>>> Stashed changes
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
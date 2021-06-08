import express from 'express';
import Sensor from './models/sensor_models';

const app = express();
const port = 3000;
 
import mongoose from 'mongoose';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});


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
.get('/api/fonction/get/:id', (req, res) => {
  var findSensor =  Sensor.find({id: parseInt(req.params.id)});

  findSensor.exec(function(err,result){
    if(err)
      res.status(400).json({ err });
      
    if(Object.keys(result).length === 0)
      res.status(400).json({ message: "This sensor doesn't exist in the database" });
    
    res.status(201).json({ message: result})
  });
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
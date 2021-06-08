import express from 'express';
import mongoose from 'mongoose';
import Sensor from './models/sensor_models';



mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true,
});
const db_mongo = mongoose.connection;
db_mongo.on('error', console.error.bind(console, 'connection error:'));
db_mongo.once('open', function() {
  console.log('MongoDB connected...')
});

// db_mysql.authenticate()
//   .then(()=> console.log('MySQL connected...'))
//   .catch(err => console.log('Error : ' + err))







const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require('./models');
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});


// app.get('/', (req, res) => {
//   res.send('Le Serveur est connecté mon bro');
// })
// .get('/api/fonction/getAll', (req, res) => {
//   Sensor.countDocuments()
//   .then(Sensor => {
//     res.status(200).send("Nous avons " + Sensor + " capteur(s) dans notre BDD")
//   })
//   .catch(error => res.status(400).json({ error }));
// })
// .get('/api/fonction/get/:id', (req, res) => {
//   var findSensor =  Sensor.find({id: parseInt(req.params.id)});

//   findSensor.exec(function(err,result){
//     if(err)
//       res.status(400).json({ err });
      
//     if(Object.keys(result).length === 0)
//       res.status(400).json({ message: "This sensor doesn't exist in the database" });
    
//     res.status(201).json({ message: result})
//   });
// });

// app.post('/api/fonction/add', (req, res) => {
//   const createSensor = new Sensor({
//     id : req.body.id,
//     type : req.body.type,
//     data : req.body.data
//   })
//   createSensor.save()
//   .then(() => res.status(201).json({ message: 'Objet add succesfully !'}))		
//   .catch(error => res.status(400).json({ error }));
// });

// app.delete('/api/fonction/delete/', (req, res) => {
//   const deleteSensor = { id: req.body.id};
// 	Sensor.deleteMany(deleteSensor)
//   .then(() => res.status(200).json({ message: 'Objet delete !'}))		
//   .catch(error => res.status(400).json({ error }));
// });

// app.put('/api/fonction/edit/:id', (req, res) => {
//   const filter = {id : parseInt(req.params.id)}
//   const update = { type : req.body.type, data : req.body.data }
//   Sensor.findOneAndUpdate(filter, update)
//   .then(Sensor => res.status(202).json({message : "Edit Succesfully"}))
//   .catch(error => res.status(400).json({ error }));
// });

require("./routes/route")(app);

const port = 3000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
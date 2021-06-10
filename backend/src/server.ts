import mongoose from 'mongoose';
import Sensor from './models/sensor_models';
require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const log = require('./modules/logger')
const cors = require("cors");
const { checkJWT } = require('./modules/jwt');

//Import routes 
var usersRouter = require('./routes/user')
var authRouter = require('./routes/auth')
var loginRouter = require('./routes/login')

var secureRouter = require('./routes/secure')

var corsOptions = {
  origin: "http://localhost:3001",
};

//Connection MongoDB
mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true,
});
const db_mongo = mongoose.connection;
db_mongo.on('error', console.error.bind(console, 'connection error:'));
db_mongo.once('open', function() {
  console.log('MongoDB connected...')
});

//Connection MySQL
const db = require('./models');
db.sequelize.authenticate()
  .then(()=> console.log('MySQL connected...'))
  .catch(err => console.log('Error : ' + err))
// db.sequelize.sync().then(() => {
//   console.log("Drop and re-sync db.");
// });


//Create App with options
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));


app.use('/login', loginRouter);
app.use('/auth', authRouter);

//Middleware
var secure = function (req,res,next) {
  var token = req.headers.authorization
  if(token) {
      token = token.replace(/^Bearer\s+/, "");     
      const verif = checkJWT(token)
      if(verif == "renew") {
        return res.status(500).json({
            success : false,
            message : 'Token is expired'
        });
      }
      else if(verif) {
        req.user = verif.user;
        console.log(req.user)
        next()
      }
      else{
        log.info('Bad Token')
          return res.status(500).json({
              success : false,
              message : 'Token is not valid'
          });
      }
  }else{
      return res.status(500).json({
          success : false,
          message : 'Token not provided'
      })
  }
}

app.use(secure)

app.use('/users' ,usersRouter);

const port = 3000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

module.exports = app;


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
import mongoose from 'mongoose';

mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTION')
});

const sensorSchema = new mongoose.Schema({
    id: Number,
    type : String,
    data : [String]
  });
  
const Sensor = mongoose.model('Sensor', sensorSchema);

export {Sensor};
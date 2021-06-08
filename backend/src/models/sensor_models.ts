import mongoose, {Schema, Document} from 'mongoose';

const sensorSchema : Schema = new Schema({
    id: {type : Number, required : true, unique: true},
    type : {type : String, required : true},
    data : {type : [String], required : true},
    metrics : {type : Boolean, required : false} 
});

export interface ISensor extends Document {
    id: number,
    type : string,
    data : [string]
  }

  export default mongoose.model<ISensor>('Sensor', sensorSchema);
    
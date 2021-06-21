import mongoose, {Schema, Document} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);


const restaurantSchema : Schema = new Schema({
    titre : {type : String, required : true},
    type : {type : String, required : true},
    owner : {type : String, required : true},
    note : {type : Number, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : true},
    menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    article: [{ type: Schema.Types.ObjectId, ref: 'Article' }]

  });
restaurantSchema.plugin(AutoIncrement, {id : 'restaurant_id', inc_field: 'id'});
export interface IRestaurant extends Document {
  titre : string,
  type : string,
  owner : string,
  note : number,
  description : string,
  picture : string,
  menu : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Menu"
  }],
  article : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Article"
  }],
}
var MRestaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);


const menuSchema : Schema = new Schema({
    titre : {type : String, required : true},
    id_restaurant : {type : String, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : true},
    prix : {type : Number, required : true},
    article: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
  });
menuSchema.plugin(AutoIncrement, {id : 'menu_id', inc_field: 'id'});
export interface IMenu extends Document {
  titre : string,
  id_restaurant : String,
  description : string,
  picture : string,
  prix : number,
  article : [{
    type : Schema.Types.ObjectId,
    ref : "Article"
  }],
}
var MMenu = mongoose.model<IMenu>('Menu', menuSchema);


const articleSchema : Schema = new Schema({
    titre : {type : String, required : true},
    id_restaurant : {type : String, required : true},
    type : {type : String, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : true},
    prix : {type : Number, required : true},
});
articleSchema.plugin(AutoIncrement, {id : 'article_id', inc_field: 'id'});
export interface IArticle extends Document {
  titre : string,
  id_restaurant : String,
  type : string,
  description : string,
  picture : string,
  prix : number,
}
var MArticle = mongoose.model<IArticle>('Article', articleSchema);



module.exports  = {Restaurant : MRestaurant, Menu : MMenu, Article : MArticle}
    
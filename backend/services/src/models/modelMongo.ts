import mongoose, {Schema, Document} from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);


const restaurantSchema : Schema = new Schema({
    titre : {type : String, required : true},
    type : {type : String, required : true},
    owner : {type : String, required : true},
    rue : {type : String, required : true},
    ville : {type : String, required : true},
    pays : {type : String, required : true},
    code_postale : {type : Number, required : true},
    note : {type : Number, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : false},
    menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    article: [{ type: Schema.Types.ObjectId, ref: 'Article' }],

  });
restaurantSchema.plugin(AutoIncrement, {id : 'restaurant_id', inc_field: 'id'});
export interface IRestaurant extends Document {
  titre : string,
  type : string,
  owner : string,
  rue : string,
  ville : string,
  pays : string,
  code_postale : number,
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
    specific : {type : String, required : true},
    description : {type : String, required : true},
    picture : {type : String, required : true},
    prix : {type : Number, required : true},
});
articleSchema.plugin(AutoIncrement, {id : 'article_id', inc_field: 'id'});
export interface IArticle extends Document {
  titre : string,
  id_restaurant : String,
  type : string,
  specific : string,
  description : string,
  picture : string,
  prix : number,
}
var MArticle = mongoose.model<IArticle>('Article', articleSchema);


const orderSchema : Schema = new Schema({
  content : {type : [String], required : true},
  id_restaurant : { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  email_customer : {type : String, required : true},
  email_delivery : {type : String, required : false, default : null},
  prix : {type : Number, required : true},
  status : {type : String, required : true, default : "unpaid"},
  rue : {type : String, required : true},
  ville : {type : String, required : true},
  code_postale : {type : Number, required : true},
});
export interface IOrder extends Document {
content : [string],
id_restaurant : {
  type : Schema.Types.ObjectId,
  ref : "Restaurant"
},
email_customer : string,
email_delivery : string,
prix : number,
status : string,
rue : string,
ville : string,
code_postale : number,
}
var MOrder = mongoose.model<IOrder>('Order', orderSchema);

const sponsorSchema : Schema = new Schema({
  email_user : {type : String, required : true},
  email_friend : {type : String, required : true},
});
export interface ISponsor extends Document {
  email_user : String,
  email_friend : string,
}
var MSponsor = mongoose.model<ISponsor>('Sponsor', sponsorSchema);



module.exports  = {Restaurant : MRestaurant, Menu : MMenu, Article : MArticle, Order : MOrder, Sponsor : MSponsor}
    
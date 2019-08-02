const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: {type: String, required: true},
  description: {type:String, required: true},
  img:   String,
  price: {type:Number, min: 0},
  qty: {type:Number, min: 0},
  
  // add your code here to set up your schema
});

const Store = mongoose.model('Store', storeSchema);

//make this exportable to be accessed in `app.js`
module.exports = Store;
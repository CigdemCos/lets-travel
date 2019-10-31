// creating schema and model

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//creating schema
let userSchema = new Schema({
    email: String,
    password: String
});
//Creating model 
let User = mongoose.model('User', userSchema, 'users');


module.exports = {
  User  // export the model
}
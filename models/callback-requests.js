// creating schema and class

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
})

//Creating model
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = {
    CallbackRequest //it is an object
}
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const subscriberSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const subscriberModel = mongoose.model('subscriber', subscriberSchema)
module.exports = subscriberModel
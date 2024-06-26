const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const postSchema = new Schema({
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

const postModel = mongoose.model('post', postSchema)
module.exports = postModel
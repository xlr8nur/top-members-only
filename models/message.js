const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    text: {type: String, required: true},
},
{timestamps: true});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
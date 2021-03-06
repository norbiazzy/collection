const {Schema, model, Types} = require("mongoose");

const Item = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    collectionId: {type: Types.ObjectId, ref: 'Collection', required: true},
    likes: [{type: Types.ObjectId}],
    comments: [{type: Types.ObjectId}],
    name: {type: String, required: true},
    description: {type: String},
    created: {type: Date, default: Date.now},
    tags: [],
    headers: {
        text: [{type:String}],
        number: [{type:String}],
        textarea: [{type:String}],
        checkbox: [{type:String}],
        date: [{type:String}]
    }
})

module.exports = model('Item', Item)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tagSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  nametag: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

var tag = mongoose.model('tags', tagSchema)

module.exports = tag;

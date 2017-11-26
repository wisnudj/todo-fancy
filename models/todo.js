const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-fancy')
const Schema = mongoose.Schema

var todoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  detail: {type: String},
  status: {type: String, default: "belum selesai"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  nametag: [{ type: Schema.Types.ObjectId, ref: 'tags' }]
})

var todo = mongoose.model('todos', todoSchema)

module.exports = todo;

const todoModel = require('../models/todo')
const userModel = require('../models/user')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/crud-mongo')
const Schema = mongoose.Schema

class Todolist {

  static getAllTask(req, res) {
    userModel.findOne({email: req.header.decoded.email}).populate('todolist').exec((err, user) => {
      var hasil = {
        username: user.username,
        email: user.email,
        task: user.todolist
      }

      res.send(hasil)
    })
  }

  static addTask(req, res) {
    userModel.findOne({email: req.header.decoded.email}).then((user) => {
      var task = new todoModel({
        judul: req.body.judul,
        user: user._id,
        detail: req.body.detail
      })

      task.save(function(err) {
        user.todolist.push(task)
        user.save(function() {
          res.send('berhasil')
        })
      })
    })
  }

  static deleteTask(req, res) {
    todoModel.findOne({_id: req.body.id}).then((user) => {
      user.remove(function() {
        userModel.findOne()
      })
    })
  }

  static tandaiselesai(req, res) {
    todoModel.findOne({_id: req.body.id}).then((todo) => {
      todo.status = "selesai"
      todo.save(function() {

        res.send(todo)

      })
    })
  }

  static tandaibelum(req, res) {
    todoModel.findOne({_id: req.body.id}).then((todo) => {
      todo.status = "belum selesai"
      todo.save(function() {

        res.send(todo)

      })
    })
  }

}

module.exports = Todolist;

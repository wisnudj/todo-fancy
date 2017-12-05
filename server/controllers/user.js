const FB = require("fb");
const userModel = require('../models/user')
const kripto = require('../helpers/kripto');
const jwtoken = require('../helpers/jwtoken');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class User {

  static signup(req, res) {
    var plainpassword = req.body.password

    kripto.enkripsi(plainpassword).then((hash) => {
      userModel.create({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      }).then(() => {
        res.status(200).send(hash)
      })
    })

  }


  static signin(req, res) {
    userModel.findOne({email: req.body.email}).then((user) => {
      if(user) {
        var plainpassword = req.body.password
        var hash = user.password
        kripto.dekripsi(plainpassword, hash).then((hasil) => {
          if(hasil) {
            jwtoken.createtoken(user).then((token) => {
              res.send({pesan: "berhasil login", token: token})
            })

          }
          else {
            res.send('salah')
          }
        })
      }
    })
  }

  static getAllUser(req, res) {
    userModel.find().then((user) => {
      res.send(user)
    })
  }

  static facebooksignin(req, res) {
    FB.setAccessToken(req.body.accessToken);
    FB.api(req.body.userID,{fields:["id","name","email","picture"]},(response)=>{
      userModel.findOne({email: response.email}).then((user) => {
        if(user) {
          jwtoken.createtoken(user).then((token) => {
            res.send({pesan: "berhasil login facebook", token: token})
          })
        } else {
          var plainpassword = response.name

          kripto.enkripsi(plainpassword).then((hash) => {
            userModel.create({
              _id: new mongoose.Types.ObjectId(),
              username: response.name,
              email: response.email,
              password: hash
            }).then(() => {
              res.status(200).send('berhasil')
            })
          })
        }
      })
    })
  }

}

module.exports = User;

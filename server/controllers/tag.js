const Schema = mongoose.Schema

const tagModel = require('../models/tag')


class Tag {

  static getAllTag(req, res) {
    tagModel.find().then((tags) => {
      res.send(tags)
    })
  }

  static addTag(req, res) {
    tagModel.create({
      nametag: req.body.nametag
    }).then(() => {
      res.send('berhasil')
    })
  }

  // static deleteTag(req, res) {
  //   tagModel.findOne({_id: })
  // }

}

module.exports = Tag;

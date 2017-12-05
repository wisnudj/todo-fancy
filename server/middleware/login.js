const jwtokenhelp = require('../helpers/jwtoken')

var login = (req, res, next) => {
  var token = req.params.id
  jwtokenhelp.verifytoken(token).then((decoded) => {
    if(decoded.login) {
      req.header.decoded = decoded
      next()
    }
    else {
      res.send('belum login')
    }
  })
}

module.exports = login;

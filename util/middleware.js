const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { SECRET } = require('./config')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = async  (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ') && authorization.length > 8) {
      try {
        const getToken = authorization.substring(7)
        req.decodedToken = jwt.verify(getToken, SECRET)
        //console.log('TOKEN: ' + JSON.stringify(req.decodedToken))
        let user = await User.findOne({ where: {token:getToken} })
        if(user && user.id!==undefined) {
          req.decodedToken.decodedToken = getToken
          req.decodedToken.id = user.id
        } else {
          res.status(401).json({ error: 'forbidden' })
        }
      } catch{
        res.status(401).json({ error: 'token invalid' })
      }
    }  else {
      res.status(401).json({ error: 'token missing' })
    }
    next()
  }
  
module.exports = {
    unknownEndpoint, tokenExtractor
}

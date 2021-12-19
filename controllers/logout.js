const router = require('express').Router()

const User = require('../models/user')
const { tokenExtractor } = require('../util/middleware')

router.get('/', tokenExtractor, async (req, res) => {
  let user = await User.findByPk(req.decodedToken.id)
  let token = ''

  user.token = token
  await user.save()

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
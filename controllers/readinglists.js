const router = require('express').Router()
const { Op, Sequelize } = require('sequelize')

const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
    let user_id = req.decodedToken?.id ?? null;
    req.list = await ReadingList.findOne(  { where: {  [Op.and]: [{ blog_id: req.params.id }, { user_id: user_id }]  } } )
    next()
}

router.post('/', tokenExtractor, async (req, res) => {
    try {
      //const user = await User.findByPk(req.decodedToken.id)
      const readinglist = await ReadingList.create({...req.body})    
      res.json(readinglist)
    } catch(error) {
      return res.status(400).json({ error })
    }
})
  
router.put('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.list) {
      req.list.read = true
      await req.list.save()
      res.json(req.list)
  } else {
      res.status(404).end()
  }
})


module.exports = router
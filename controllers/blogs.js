
const router = require('express').Router()
const { Op, Sequelize } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}


router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or] : [
        { title : {
          [Op.substring]: req.query.search
          },
        },
        { author : {
          [Op.substring]: req.query.search
          },
        },
      ]
    }
  }  
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC'],
    ]
  })
  res.json(blogs)
})

router.get('/authors', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { 
      include: [ 'blog.author',  Sequelize.fn('SUM', Sequelize.col('blog.likes')),  Sequelize.fn('COUNT', Sequelize.col('blog.author')) ],
      exclude: ['userId' , 'id', 'title', 'url', 'author', 'likes'] 
    },
    group: 'blog.author'
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})    
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  })
  
router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
    if (req.blog) {
        const user = await User.findByPk(req.decodedToken.id)
        if(req.blog.userId===user.id)
          await req.blog.destroy()
    }
    res.status(204).end()
})

router.put('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.blog.likes + 1
        await req.blog.save()
        res.json(req.blog.likes)
    } else {
        res.status(404).end()
    }
})

module.exports = router
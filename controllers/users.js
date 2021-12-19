const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')

const { User, Blog, ReadingList } = require('../models')

router.get('/', tokenExtractor, async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })  
  res.json(users)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', tokenExtractor, async (req, res) => {
  
  let where = {}

  if(req.query.read && req.query.read==='true') {
    where = {
      read: true
    }
  } else if (req.query.read && req.query.read==='false') {
    where = {
      read: false
    }
  }

  const user = await User.findByPk( req.params.id , {
    attributes: { exclude: [''] } ,
    include:[{
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'read_blog',
        attributes: { exclude: ['userId']},
        through: {
          attributes: []
        },
        include: {
          model: User,
          attributes: ['name']
        },
      },
      {        
        model: ReadingList,
        as: 'reading_lists',
        attributes: ['read', 'id'],
        where
      }
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', tokenExtractor, async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
        await user.update(req.body)
        res.json(user)
    } else {
      res.status(404).end()
    }
  })
  
module.exports = router
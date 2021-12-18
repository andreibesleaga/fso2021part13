require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const express = require('express')
const app = express()
app.use(express.json())

// connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

// list all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  res.json(blogs)
})

// save new blog entry
app.post('/api/blogs', async (req, res) => {
  let author = req.body.author
  let url = req.body.url
  let title = req.body.title
  let likes = req.body.likes
  const blogs = await sequelize.query(`INSERT INTO blogs (author,url,title,likes) VALUES ('${author}','${url}','${title}','${likes}')`, { type: QueryTypes.INSERT })
  res.json(blogs)
})

// delete a blog entry
app.delete('/api/blogs/:id', async (req, res) => {
  const blogs = await sequelize.query("DELETE FROM blogs WHERE id=" + req.params.id, { type: QueryTypes.DELETE })
  res.json(blogs)
})

// strt server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

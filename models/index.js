const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'read_blog' , foreignKey: 'blog_id' })
Blog.belongsToMany(User, { through: ReadingList, as: 'user_read', foreignKey: 'user_id' })
User.hasMany(ReadingList);
ReadingList.belongsTo(User);
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);


//Blog.sync({ alter: true })
//User.sync({ alter: true })
//ReadingList.sync({ alter: true })

module.exports = {
  Blog, User, ReadingList
}
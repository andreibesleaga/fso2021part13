const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    defaultValue: 2000,
    validate: {
      min:1991,
      max: 2021
    },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

module.exports = Blog
const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('blogs', {
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
          created_at: {
            type: DataTypes.DATE
          },
          updated_at: {
            type: DataTypes.DATE
          },          
    })
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "username must be a valid email"
                }        
            }    
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          created_at: {
            type: DataTypes.DATE
          },
          updated_at: {
            type: DataTypes.DATE
          },
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min:1991,
        max: 2021
      },
      allowNull: false,
    })    
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}
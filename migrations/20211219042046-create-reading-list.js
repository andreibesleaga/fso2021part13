'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reading_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },  
      },
      read: {
        type: Sequelize.BOOLEAN
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reading_lists');
  }
};
import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  username: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  avatar: {
    type: Sequelize.TEXT,
  },

  know_words: {
    type: Sequelize.INTEGER,
  },

  all_my_words: {
    type: Sequelize.INTEGER,
  },

  articles_count: {
    type: Sequelize.INTEGER,
  },

  last_login: {
    type: Sequelize.DATE
  },

  level: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
});
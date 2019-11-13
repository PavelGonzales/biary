import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('articles', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  content: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  date: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  userId: {
    type: Sequelize.INTEGER,
    notEmpty: true
  }
});

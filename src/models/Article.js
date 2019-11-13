import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('article', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  content: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  text: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  meta_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  }
});
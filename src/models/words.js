import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('words', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  original: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  translate: {
    type: Sequelize.TEXT,
    notEmpty: true
  }
});
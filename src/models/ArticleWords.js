import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('article_words', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  article_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  word_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },
});
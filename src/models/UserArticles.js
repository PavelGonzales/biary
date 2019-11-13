import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('user_articles', {
  user_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  article_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  know_words: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },
});
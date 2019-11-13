import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('user_words', {
  user_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  word_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  new: {
    type: Sequelize.BOOLEAN,
    notEmpty: true
  },

  know: {
    type: Sequelize.BOOLEAN,
    notEmpty: true
  },

  not_know: {
    type: Sequelize.BOOLEAN,
    notEmpty: true
  },
});
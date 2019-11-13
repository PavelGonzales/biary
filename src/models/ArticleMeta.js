import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('article_meta', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  author: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  date: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  description: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  image: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  logo: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  publisher: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  title: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  url: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  total: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },

  uniq: {
    type: Sequelize.INTEGER,
    notEmpty: true
  },
  
  article_id: {
    type: Sequelize.INTEGER,
    notEmpty: true
  }
});
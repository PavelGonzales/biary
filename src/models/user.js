import Sequelize from 'sequelize';
import sequelize from '../db';

export default sequelize.define('users', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  name: {
    type: Sequelize.TEXT,
    notEmpty: true
  },

  surname: {
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
  }
});

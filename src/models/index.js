import User from './User';
import Article from './Article';

User.hasMany(Article, {unique: false, foreignKey: 'userId'});

export default {
  User,
  Article
};

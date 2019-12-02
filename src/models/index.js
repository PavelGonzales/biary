import User from './user';
import Article from './article';

User.hasMany(Article, {unique: false, foreignKey: 'userId'});

export default {
  User,
  Article
};

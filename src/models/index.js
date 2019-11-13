import User from './User';
import Article from './Article';

User.hasMany(Article, {foreignKey: 'userId'});

export default {
  User,
  Article
};

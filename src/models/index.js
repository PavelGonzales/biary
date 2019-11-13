import User from './User';
import Words from './Words';
import Article from './Article';
import UserWords from './UserWords';
import UserArticles from './UserArticles';
import ArticleMeta from './ArticleMeta';
import ArticleWords from './ArticleWords';

User.hasMany(UserWords, {foreignKey: 'user_id'});

export default {
  User,
  Words,
  Article,
  UserWords,
  UserArticles,
  ArticleMeta,
  ArticleWords
};

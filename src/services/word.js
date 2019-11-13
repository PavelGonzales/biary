import Model from '../models';
import Sequelize from 'sequelize';
import rp from 'request-promise';
import {createQueryStringArray} from '../helpers/queryString';
import {diff} from '../helpers/array';

const Op = Sequelize.Op;
const Words = Model.Words;
const UserWords = Model.UserWords;
const UserArticles = Model.UserArticles;
const ArticleWords = Model.ArticleWords;

const getWord = word => Words.findOne({where: {original: word}});

const addWord = wordData => Words.create(wordData);

const getWordsByUser = async ({user_id, offset = 0, limit = 100, type = 'new'}) => {
  const userWords = await UserWords.findAndCountAll({
    where: {
      user_id,
      new: type === 'new' ? true : null,
      know: type === 'know' ? true : null,
      not_know: type === 'not_know' ? true : null,
      
    },
    offset,
    limit,
    raw: true
  });

  const data = await Words.findAll({
    where: {
      id: userWords.rows.map(item => item.word_id),
    },
    raw: true
  });

  return {
    data,
    total: userWords.count
  };
};

const changeWordStatusByUser = async ({user_id, word_id, status}) => {
  if (!['new', 'know', 'not_know'].includes(status)) {
    throw new Error('Неверное поле status');
  }

  return UserWords.update({
    [status]: true,
    new: null
  }, {
    returning: true,
    raw: true,
    where: {
      user_id,
      word_id
    }
  });
};

const updateUserArticlesMetaByKnowWords = async ({user_id, word_id}) => {
  const articleWords = await ArticleWords.findAll({
    where: {
      word_id
    },
    raw: true
  });

  const article_ids = articleWords.map(item => item.article_id);

  return UserArticles.update({ 
    know_words: Sequelize.literal('know_words + 1')
  }, { 
    where: { 
      user_id,
      article_id: {
        [Op.in]: article_ids
      }
    }
  });
};

const addWords = async ({words}) => {
  try {
    const res = await Words.findAll({
      where: {
        original: {
          [Op.in]: words
        }
      },
      raw: true
    });

    const wordsFromDB = res.map(item => item.original);
  
    const diffBetweenDB = diff(words, wordsFromDB);

    try {
      const arrResponses = await Promise.all(createQueryStringArray(diffBetweenDB, []).map(async url => await rp(url)));

      const translatedWords = arrResponses.reduce((acc, res) => {
        acc = [...acc, ...JSON.parse(res).text];

        return acc;
      }, []);

      const result = diffBetweenDB.map((original, index) => {
        return {
          original,
          translate: translatedWords[index]
        };
      });

      return Words.bulkCreate(result, {returning: true, raw: true});
    } catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const addWordsByArticle = async ({article_id, words}) => {
  const word_ids = await getWordsIds({words});
  const result = word_ids.map(word_id => ({
    article_id,
    word_id
  }));

  return ArticleWords.bulkCreate(result, {returning: true, raw: true});
};

const addWordsByUser = ({user_id, word_ids}) => {
  const result = word_ids.map(word_id => ({
    user_id,
    word_id
  }));

  return UserWords.bulkCreate(result, {returning: true});
};

const setUserKnownWords = async ({user_id, article_id, words}) => {
  const word_ids = await getWordsIds({words});

  const know_words = await UserWords.findAll({
    where: {
      word_id: {
        [Op.in]: word_ids,
      },
      user_id,
      know: true
    },
    raw: true
  });

  return UserArticles.update({ 
    know_words: know_words.length
  }, { 
    where: { 
      user_id,
      article_id
    }
  });
};

const getWordsIds = async ({words}) => {
  const wordsRes = await Words.findAll({
    where: {
      original: {
        [Op.in]: words
      }
    },
    raw: true
  });

  return wordsRes.map(item => item.id);
};

export default {
  getWord,
  addWord,
  addWords,
  getWordsByUser,
  addWordsByUser,
  changeWordStatusByUser,
  updateUserArticlesMetaByKnowWords,
  setUserKnownWords,
  addWordsByArticle
};

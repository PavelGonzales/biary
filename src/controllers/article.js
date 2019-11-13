import articleService from '../services/article';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');
const getDate = date => {
  return {
    link: date ? dayjs(date).format('YYYY.MM.DD') : null,
    text: date ? dayjs(date).format('DD MMMM YYYY') : null
  };
};

const get = async (req, res) => {
  const {date} = req.params;

  try {
    const rawArticleFromDB = await articleService.get(date);
    const articleFromDB = rawArticleFromDB[0][0];
    let result;

    if (articleFromDB) {
      result = {
        content: articleFromDB.content,
        data: {
          prev: getDate(articleFromDB.prevdate),
          current: getDate(articleFromDB.date),
          next: getDate(articleFromDB.nextdate)
        }
      };
    } else {
      result = null;
    }
    
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const getList = async (req, res) => {
  const {userId, offset, limit, type} = req.body;

  try {
    const data = await articleService.getList({userId, offset, limit, type});

    res.json({
      data
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const add = async (req, res) => {
  const {content} = req.body;

  try {
    const wordsRes = await articleService.add({content});

    if (wordsRes.length) {
      const word_ids = wordsRes.map(item => item.id);
      const userId = req.user.id;

      articleService.addWordsByUser({userId, word_ids});
      articleService.setUserKnownWords({userId, word_ids});
    }

    res.json({
      data: wordsRes
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

export default {
  get,
  add,
  getList
};
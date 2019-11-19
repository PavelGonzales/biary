import articleService from '../services/article';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');
const getDate = date => {
  if (date) {
    return {
      link: dayjs(date).format('YYYY-MM-DD'),
      text: dayjs(date).format('DD MMMM YYYY')
    };
  }

  return null;
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
        date: {
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
  const {userId = 1, offset, limit} = req.body;

  try {
    const data = await articleService.getList({userId, offset, limit});

    const result = data.map(item => ({
      date: getDate(item.date),
      content: item.shortContent
    }));

    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const add = async (req, res) => {
  const {userId = 1, content, shortContent, date} = req.body;

  try {
    const article = await articleService.add({userId, content, shortContent, date});

    res.json(article);
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

const remove = async (req, res) => {
  const {userId = 1, date} = req.body;

  try {
    const article = await articleService.remove({userId, date});

    res.json(article);
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

export default {
  get,
  add,
  getList,
  remove
};
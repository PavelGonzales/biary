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
  const {id} = req.user;

  try {
    const rawArticleFromDB = await articleService.get({userId: id, date});
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
  const {offset, limit} = req.user;
  const {id} = req.user;

  try {
    const data = await articleService.getList({userId: id, offset, limit});
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
  const {content, shortContent, date} = req.body;
  const {id} = req.user;

  try {
    const article = await articleService.add({userId: id, content, shortContent, date});

    res.json(article);
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

const remove = async (req, res) => {
  const {date} = req.body;
  const {id} = req.user;

  try {
    const article = await articleService.remove({userId: id, date});

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
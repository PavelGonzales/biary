import Model from '../models';
import sequelize from '../db';

const Article = Model.Article;
const UserWords = Model.UserWords;

const get = date => {
  const query = `
    select id, content, prevDate, date, nextDate
    from (
        select id, 
              content,
              lag(date) over (order by date) as prevDate,
              date,
              lead(date) over (order by date) as nextDate
        from articles
    ) as t
    where date = '${date}'`;

  return sequelize.query(query, {raw: true});
};

const getList = async ({userId, offset = 0, limit = 100, type = 'new'}) => {
  const userWords = await UserWords.findAndCountAll({
    where: {
      userId,
      new: type === 'new' ? true : null,
      know: type === 'know' ? true : null,
      not_know: type === 'not_know' ? true : null,
      
    },
    offset,
    limit,
    raw: true
  });

  const data = await Article.findAll({
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

const add = async () => {

};

export default {
  get,
  getList,
  add
};

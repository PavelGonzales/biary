import Model from '../models';
import sequelize from '../db';

const Article = Model.Article;

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

const getList = async ({userId, offset = 0, limit = 365}) => {
  return await Article.findAll({
    where: {
      userId
    },
    offset,
    limit,
    raw: true
  });
};

const add = async () => {

};

export default {
  get,
  getList,
  add
};

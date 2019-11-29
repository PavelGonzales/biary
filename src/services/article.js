import Model from '../models';
import sequelize from '../db';

const Article = Model.Article;

const get = ({userId, date}) => {
  const query = `
    select id, "userId", content, prevDate, date, nextDate
    from (
        select id,
              "userId",
              content,
              lag(date) over (order by date) as prevDate,
              date,
              lead(date) over (order by date) as nextDate
        from articles
    ) as t
    where date = '${date}' and "userId" = '${userId}'`;

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

const add = async ({userId, content, shortContent, date}) => {
  const created = await Article.findOne({
    where: {
      userId,
      date
    }
  });


  if (created) {
    return created.update({
      content,
      shortContent,
    });
  }

  return Article.create({
    userId,
    content,
    shortContent,
    date
  });
};

export const remove = async ({userId, date}) => {
  return Article.destroy({
    where: {
      userId,
      date
    }
  });
};

export default {
  get,
  getList,
  add,
  remove
};

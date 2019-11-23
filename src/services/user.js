import jwt from 'jsonwebtoken';
import Model from '../models';

const Users = Model.User;

const addUser = user => Users.create(user);
const getUserByEmail = email => Users.findOne({
  where: {
    email
  },
  returning: true,
  raw: true
});

const getUserByToken = token => {
  if (!token) {
    throw new Error('Пустой токен');
  }

  return jwt.verify(token, process.env.PG_SECRET, (err, decoded) => {
    if (err) {
      throw new Error('Ошибка авторизационного токена');
    }

    return Users.findOne({
      where: {
        id: decoded.id
      },
      returning: true,
      raw: true
    });
  });
};

export default {
  addUser,
  getUserByEmail,
  getUserByToken
};

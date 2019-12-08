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

const getUserByTelegramId = telegramId => Users.findOne({
  where: {
    telegramId
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

const updateUserByBotKey = async (key, telegramId) => {
  if (!key) {
    throw new Error('Пустой ключ от ота');
  }


  return jwt.verify(key, process.env.PG_SECRET, async (err, decoded) => {
    if (err) {
      throw new Error('Ошибка получения ключа бота');
    }

    const user = await Users.findOne({
      where: {
        email: decoded
      }
    });

    if (user) {
      await user.update({
        telegramId: telegramId,
      });

      return user.dataValues;
    }

    return null;
  });
};

export default {
  addUser,
  getUserByEmail,
  getUserByToken,
  updateUserByBotKey,
  getUserByTelegramId
};

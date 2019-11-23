import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from './../models';

const Users = Model.User;

const authenticate = async params => {
  const user = await Users.findOne({
    where: {
      email: params.email
    },
    raw: true
  });

  if (!user) {
    throw new Error('Неправильный email');
  }

  if (!bcrypt.compareSync(params.password || '', user.password)) {
    throw new Error('Неправильный пароль');
  }

  const payload = {
    email: user.email,
    id: user.id,
    time: new Date()
  };

  const token = jwt.sign(payload, process.env.PG_SECRET, {
    expiresIn: process.env.PG_EXPIRE_TIME
  });

  return {
    token,
    expire: process.env.PG_EXPIRE_TIME
  };
};

export default {
  authenticate
};
import userService from './../services/user';

const user = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email);
    const {
      id,
      name,
      surname,
      email,
      avatar
    } = user;

    res.json({
      id,
      name,
      surname,
      email,
      avatar
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await userService.getUserByToken(req.headers.authorization);
    const {
      id,
      name,
      surname,
      email,
      avatar,
      botKey
    } = user;

    res.json({
      id,
      name,
      surname,
      email,
      avatar,
      botKey
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
export default {
  user,
  me
};
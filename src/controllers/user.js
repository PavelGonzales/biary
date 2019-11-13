import userService from './../services/user';

const user = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email);
    const {
      id,
      username,
      email,
      level,
      avatar,
      know_words,
      all_my_words,
      articles_count
    } = user;

    res.json({
      id,
      username,
      email,
      level,
      avatar,
      know_words,
      all_my_words,
      articles_count
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
      username,
      email,
      level,
      avatar,
      know_words,
      all_my_words,
      articles_count
    } = user;

    res.json({
      id,
      username,
      email,
      level,
      avatar,
      know_words,
      all_my_words,
      articles_count
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
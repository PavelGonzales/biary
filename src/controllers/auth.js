import bcrypt from 'bcrypt';
import authService from './../services/auth';
import userService from './../services/user';

const login = async (req, res) => {
  try {
    const data = await authService.authenticate(req.body);

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const logout = (req, res) => {
  res.json();
};

const register = async (req, res) => {
  try {
    const exists = await userService.getUserByEmail(req.body.email || '');
    
    if (exists) {
      return res.status(409).json({
        message: 'Пользователь с таким email уже существует'
      });
    }
    const {username, email, password} = req.body;

    const user = {
      username,
      email,
      password: bcrypt.hashSync(password, Number(process.env.PG_SALT_ROUNDS))
    };

    try {
      await userService.addUser(user);

      res.json({
        username,
        email,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

export default {
  login,
  logout,
  register
};
import authController from './../controllers/auth';
import user from './../controllers/user';
import wordController from './../controllers/word';
import {checkAuth} from './../middlewares/auth';

export default {
  set: app => {
    app.post('/login', authController.login);
    app.post('/logout', authController.logout);
    app.post('/register', authController.register);
    app.get('/user', checkAuth, user.user);
    app.get('/me', user.me);

    app.get('/word/get/:word', wordController.get);
    app.post('/user/words', wordController.getAll);
    app.post('/words/add/', checkAuth, wordController.add);

    app.put('/words/changestatus/', wordController.changeWordStatusByUser);
  },
};
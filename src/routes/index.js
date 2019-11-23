import articleController from './../controllers/article';
import fileController from './../controllers/file';
import authController from './../controllers/auth';
import userController from './../controllers/user';
import {checkAuth} from './../middlewares/auth';

export default {
  set: app => {
    app.post('/auth/login', authController.login);
    app.post('/auth/logout', authController.logout);
    app.post('/auth/registration', authController.register);
    app.get('/auth/user', checkAuth, userController.user);
    app.get('/auth/me', userController.me);

    app.get('/article/list', articleController.getList);
    app.get('/article/:date', articleController.get);
    app.post('/article/add', articleController.add);
    app.post('/article/remove', articleController.remove);
    app.post('/article/fileUpload', fileController.upload);
  },
};
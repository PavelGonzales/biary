import articleController from './../controllers/article';
import fileController from './../controllers/file';
import authController from './../controllers/auth';
import userController from './../controllers/user';
import {checkAuth} from './../middlewares/auth';
import packageJson from './../../package.json';

export default {
  set: app => {
    app.get('/', (req, res) => {
      res.send(`
        name: ${packageJson.name}<br>
        version: ${packageJson.version}<br>
        description: ${packageJson.description}<br>
        author: ${packageJson.author}<br>
      `);
    });

    app.post('/auth/login', authController.login);
    app.post('/auth/logout', authController.logout);
    app.post('/auth/registration', authController.register);
    app.get('/auth/user', checkAuth, userController.user);
    app.get('/auth/me', checkAuth, userController.me);

    app.post('/article/list', checkAuth, articleController.getList);
    app.get('/article/:date', checkAuth, articleController.get);
    app.post('/article/add', checkAuth, articleController.add);
    app.post('/article/remove', checkAuth, articleController.remove);
    app.post('/article/fileUpload', checkAuth, fileController.upload);
  },
};
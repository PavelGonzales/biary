import articleController from './../controllers/article';
import fileController from './../controllers/file';

export default {
  set: app => {
    app.get('/article/list', articleController.getList);
    app.get('/article/:date', articleController.get);
    app.post('/article/add', articleController.add);
    app.post('/article/fileUpload', fileController.upload);
  },
};
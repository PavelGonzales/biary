import articleController from './../controllers/article';

export default {
  set: app => {
    app.get('/article/list', articleController.getList);
    app.get('/article/:date', articleController.get);
    app.post('/article/add', articleController.add);
  },
};
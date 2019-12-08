import 'babel-core/register';
import 'babel-polyfill';
import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';

import router from './routes';
import TelegramBot from './bot';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/uploads`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));
app.use(upload.single('image'));
app.use('/image', express.static(`${__dirname}/uploads`));

router.set(app);

TelegramBot.launch();

app.listen(
  process.env.PORT,
  process.env.LOCAL_ADDRESS,
  // eslint-disable-next-line no-console
  () => console.log(`App listening on ${process.env.LOCAL_ADDRESS}:${process.env.PORT}`));

export default app;
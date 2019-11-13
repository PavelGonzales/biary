import 'babel-core/register';
import 'babel-polyfill';
import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));

router.set(app);

app.listen(
  process.env.PORT,
  process.env.LOCAL_ADDRESS,
  // eslint-disable-next-line no-console
  () => console.log(`App listening on ${process.env.LOCAL_ADDRESS}:${process.env.PORT}`));

export default app;
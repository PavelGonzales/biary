import Telegraf from 'telegraf';

import articleService from '../services/article';
import userService from '../services/user';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.catch((err, ctx) => {
  console.log(`Ooops, ecountered an error for ${ctx.updateType}`, err);
});

bot.start(ctx => {
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Да', callback_data: 'hasAccount' }],
        [{ text: 'Нет', callback_data: 'notHasAccount' }],
      ]
    })
  };

  ctx.reply('Добро пожаловать!');

  return ctx.reply('У вас есть аккаунт?', options);
});

bot.action('hasAccount', (ctx) => ctx.reply('Введите ваш ключ к боту'));
bot.action('notHasAccount', (ctx) => ctx.replyWithHTML('Пожалуйста, зарегистрируйтесь на <a href="http://localhost:3000/?auth=open">http://localhost:3000/?auth=open</a>'));

bot.on('text', async ctx => {
  const {text, date, from} = ctx.update.message;
  const telegramId = from.id;
  let user;

  if (text.includes('key:')) {
    const key = text.split('key:')[1];

    try {
      await userService.updateUserByBotKey(key, telegramId);

      return ctx.reply('Отлично, теперь можно вести дневник через бота!');
    } catch (err) {
      console.log('Ошибка в updateUserByBotKey', err);
    }
  }

  user = await userService.getUserByTelegramId(`${telegramId}`);

  try {
    articleService.update({
      userId: user.id, 
      content: `<p>${text}</p>`, 
      date: dayjs(date * 1000).format('YYYY-MM-DD'),
    });

  } catch (err) {
    console.log('Ошибка в телеграм боте on:text', err);
  }
});

export default bot;
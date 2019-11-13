import wordService from '../services/word';
import rp from 'request-promise';

const get = async (req, res) => {
  const original = req.params.word.toLowerCase();

  try {
    const wordFromDB = await wordService.getWord(original);

    if (!wordFromDB) {
      try {
        const resTranslate = await rp(`${process.env.TRANSLATE_API_URL}?key=${process.env.TRANSLATE_API_KEY}&lang=ru&text=${original}`);
        const translate = JSON.parse(resTranslate).text[0];

        const word = await wordService.addWord({
          original,
          translate
        });

        res.json(word);
      } catch (err) {
        res.status(400).json({
          message: err.message
        });
      }
    } 

    res.json(wordFromDB);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const getAll = async (req, res) => {
  const {user_id, offset, limit, type} = req.body;

  try {
    const data = await wordService.getWordsByUser({user_id, offset, limit, type});

    res.json({
      data
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const add = async (req, res) => {
  const words = req.body.words;

  try {
    const wordsRes = await wordService.addWords({words});

    if (wordsRes.length) {
      const word_ids = wordsRes.map(item => item.id);
      const user_id = req.user.id;

      wordService.addWordsByUser({user_id, word_ids});
      wordService.setUserKnownWords({user_id, word_ids});
    }

    res.json({
      data: wordsRes
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

const changeWordStatusByUser = async (req, res) => {
  const {user_id, word_id, status} = req.body;

  try {
    const wordsRes = await wordService.changeWordStatusByUser({user_id, word_id, status});
    await wordService.updateUserArticlesMetaByKnowWords({user_id, word_id});

    res.json({
      word_id: wordsRes[1][0].word_id
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

export default {
  get,
  add,
  getAll,
  changeWordStatusByUser
};
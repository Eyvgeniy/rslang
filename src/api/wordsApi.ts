import axios from 'axios';
import routes from '../routes';

const fetchSetWordsState = async (user: any, wordId: string, wordData: any) => {
  try {
    await axios.post(routes.setWordState(user.id, wordId), wordData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

const fetchChangeWordsState = async (user: any, wordId: string, wordData: any) => {
  try {
    await axios.put(routes.setWordState(user.id, wordId), wordData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

const setWordToLearned = (user: any, wordId: string): void => {
  const wordData = { difficulty: 'normal' };
  fetchSetWordsState(user, wordId, wordData);
};

export default {
  setWordToLearned,
};
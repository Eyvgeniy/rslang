import axios from 'axios';
import routes from '../routes';

const fetchSetWordsState = async (user: any, wordId: string, wordData: any) => {
  return axios
    .post(routes.setWordState(user.id, wordId), wordData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const fetchChangeWordsState = (user: any, wordId: string, wordData: any) => {
  return axios
    .put(routes.setWordState(user.id, wordId), wordData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const fetchDeleteUserWord = (user: any, wordId: string) => {
  return axios
    .delete(routes.setWordState(user.id, wordId), {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const setWordToLearned = (user: any, wordId: string, stats: any): Promise<unknown> => {
  const wordData = { difficulty: 'normal', optional: { stats } };
  return fetchSetWordsState(user, wordId, wordData);
};

const updateWordToLearned = (user: any, wordId: string, stats: any): Promise<unknown> => {
  const wordData = { difficulty: 'normal', optional: { stats } };
  return fetchChangeWordsState(user, wordId, wordData);
};

const setWordToDeleted = (user: any) => (wordId: string): Promise<unknown> => {
  const wordData = { difficulty: 'easy' };
  return fetchSetWordsState(user, wordId, wordData);
};

const updateWordToDeleted = (user: any) => (wordId: string): Promise<unknown> => {
  const wordData = { difficulty: 'easy' };
  return fetchChangeWordsState(user, wordId, wordData);
};

const setWordToHard = (user: any) => (wordId: string): Promise<unknown> => {
  const wordData = { difficulty: 'hard' };
  return fetchSetWordsState(user, wordId, wordData);
};

const updateWordToHard = (user: any) => (wordId: string, stats: any): Promise<unknown> => {
  const wordData = { ...stats, difficulty: 'hard' };
  return fetchChangeWordsState(user, wordId, wordData);
};

export default {
  fetchDeleteUserWord,
  setWordToLearned,
  updateWordToLearned,
  setWordToDeleted,
  updateWordToDeleted,
  setWordToHard,
  updateWordToHard,
};

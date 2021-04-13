const host = 'https://eyvgeniy-rslang-be.herokuapp.com';

const getWords = (page = 0, group = 0): string =>
  [host, `words?page=${page}&group=${group}`].join('/');
const getWordById = (id: string): string => [host, 'word', id].join('/');

const getLearnedWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"$or":[{"userWord.difficulty":"normal"},{"userWord.difficulty":"hard"}]}`,
  ].join('/');

const getUserWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"userWord":{"$exists": true}}`,
  ].join('/');

const getAllUserWords = (id: string): string => [host, `users/${id}/words`].join('/');

const setWordState = (userId: string, wordId: string) =>
  [host, `users/${userId}/words/${wordId}`].join('/');

const signIn = (): string => [host, 'signin'].join('/');
const createUser = (): string => [host, 'users'].join('/');
const updateUser = (id: string): string => [host, 'users', id].join('/');
const deleteUser = (id: string): string => [host, 'users', id].join('/');
const getUser = (id: string): string => [host, 'users', id].join('/');
const getNewUserToken = (id: string): string => [host, 'users', id, 'tokens'].join('/');

const getUserPhotoUrl = (fileName: string): string =>
  [host, 'users', `photo?filename=${fileName}`].join('/');

export default {
  getWords,
  getWordById,
  getLearnedWords,
  getUserWords,
  getAllUserWords,
  setWordState,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getNewUserToken,
  signIn,
  getUserPhotoUrl,
};

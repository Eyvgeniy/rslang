import { AppData } from './AppConstants';

const host = AppData.Host;

const addHost = (src: string): string => [host, src].join('/');

const getWords = (page = 0, group = 0): string =>
  [host, `words?page=${page}&group=${group}`].join('/');
const getWordById = (id: string): string => [host, 'word', id].join('/');

const getLearnedWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"$or":[{"userWord.difficulty":"normal"},{"userWord.difficulty":"hard"}]}`,
  ].join('/');

const getHardWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"userWord.difficulty":"hard"}`,
  ].join('/');

const getDeletedWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"userWord.difficulty":"easy"}`,
  ].join('/');

const getUserWords = (id: string, page = 0, group = 0): string =>
  [
    host,
    `users/${id}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20&filter={"userWord":{"$exists": true}}`,
  ].join('/');

const getAllUserWords = (id: string): string => [host, `users/${id}/words`].join('/');

const setWordState = (userId: string, wordId: string): string =>
  [host, `users/${userId}/words/${wordId}`].join('/');

const signIn = (): string => [host, 'signin'].join('/');
const createUser = (): string => [host, 'users'].join('/');
const updateUser = (id: string): string => [host, 'users', id].join('/');
const deleteUser = (id: string): string => [host, 'users', id].join('/');
const getUser = (id: string): string => [host, 'users', id].join('/');
const getNewUserToken = (id: string): string => [host, 'users', id, 'tokens'].join('/');

const getUserPhotoUrl = (fileName: string): string =>
  [host, 'users', `photo?filename=${fileName}`].join('/');

const updateStatistics = (id: string): string => [host, 'users', id, 'statistics'].join('/');

export default {
  addHost,
  getWords,
  getWordById,
  getLearnedWords,
  getDeletedWords,
  getHardWords,
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
  updateStatistics,
};

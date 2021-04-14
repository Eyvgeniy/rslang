import { AppData } from './AppConstants';
const host = AppData.Host;

const getWords = (page = 0, group = 0): string =>
  [host, 'words', `?page=${page}&group=${group}`].join('/');
const getWordById = (id: string): string => [host, 'word', id].join('/');


const getUserWords = (userId: string): string =>
[host, 'users', `${userId}`, `words`].join('/');
const createUserWord = (userId: string, wordId: string): string =>
  [host, 'users', `${userId}`, `words`, `${wordId}`].join('/');
const getUserWord = (userId: string, wordId: string): string =>
  [host, 'users', `${userId}`, `words`, `${wordId}`].join('/');
const updateUserWord = (userId: string, wordId: string): string =>
  [host, 'users', `${userId}`, `words`, `${wordId}`].join('/');
const deleteUserWord = (userId: string, wordId: string): string =>
  [host, 'users', `${userId}`, `words`, `${wordId}`].join('/');


const getUserStatistics = (userId: string): string =>
[host, 'users', `${userId}`, `statistics`].join('/');
const upsertUserStatistics = (userId: string): string =>
  [host, 'users', `${userId}`, `statistics`].join('/');

const signIn = (): string => [host, 'signin'].join('/');
const createUser = (): string => [host, 'users'].join('/');
const updateUser = (id: string): string => [host, 'users', id].join('/');
const deleteUser = (id: string): string => [host, 'users', id].join('/');
const getUser = (id: string): string => [host, 'users', id].join('/');
const getNewUserToken = (id: string): string => [host, 'users', id, 'tokens'].join('/');

const getUserPhotoUrl = (fileName: string): string => [host, 'users', `photo?filename=${fileName}`].join('/');

const  updateStatistics = (id: string): string => [host, 'users', id, 'statistics', ].join('/');

export default { 
  getWords,
  getWordById,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getNewUserToken,
  signIn,
  getUserPhotoUrl, 
  updateStatistics,
  getUserWords,
  createUserWord,
  getUserWord,
  updateUserWord,
  deleteUserWord,
  getUserStatistics,
  upsertUserStatistics
};

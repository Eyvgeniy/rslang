import { AppData } from './AppConstants';
const host = AppData.Host;

const getWords = (page = 0, group = 0): string =>
  [host, 'words', `?page=${page}&group=${group}`].join('/');
const getWordById = (id: string): string => [host, 'word', id].join('/');

const signIn = (): string => [host, 'signin'].join('/');
const createUser = (): string => [host, 'users'].join('/');
const updateUser = (id: string): string => [host, 'users', id].join('/');
const deleteUser = (id: string): string => [host, 'users', id].join('/');
const getUser = (id: string): string => [host, 'users', id].join('/');
const getNewUserToken = (id: string): string => [host, 'users', id, 'tokens'].join('/');

const getUserPhotoUrl = (fileName: string): string => [host, 'users', `photo?filename=${fileName}`].join('/');

export default { 
  getWords,
  getWordById,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getNewUserToken,
  signIn,
  getUserPhotoUrl
};

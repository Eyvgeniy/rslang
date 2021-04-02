const host = 'https://eyvgeniy-rslang-be.herokuapp.com/';

const getWords = (page = 0, group = 0): string =>
  [host, 'words', `?page=${page}&group=${group}`].join('');
const getWordById = (id: string): string => [host, 'word', id].join('/');

export default { getWords, getWordById };

import { UserModel } from './User/UserModal';
import { WordModel } from './Words/WordModel';

export interface UserState {
  currentUser: UserModel | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface WordsState {
  words: WordModel[];
  allWords: WordModel[];
  userWords: WordModel[];
  userWordsLoading: string;
  page: number;
  group: number;
  loading: 'idle' | 'pending';
  error: string | null;
}

export interface RootState {
  user: UserState;
  words: WordsState;
}

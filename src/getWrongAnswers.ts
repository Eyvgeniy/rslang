import { WordModel } from './models/Words/WordModel';

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
  
export interface GameItem{
  answers: WordModel[];
  rightAnswer: number;
  correctWord: WordModel;
};

const getRandomWordExceptRight = (list: WordModel[], word: WordModel) => {
  if(!list || list.length <= 1){
    throw "Words list is empty";
  }
  let successResult = false;
  let newWord: WordModel;
  while(!successResult){
    newWord = list[getRandomInt(0, list.length)];
    if(newWord.id !== word.id){
      successResult = true;
    }
  }
  return newWord;
}

function shuffleArray<T> (a: T[]): T[] {
  const result = a.slice();
  for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const getWrongAnswers = (list: WordModel[], questions: WordModel[], numberOfAnswers: number): GameItem[] => {  
  const result: GameItem[] = [];
  const shuffledArray = shuffleArray(questions);
  for (let i = 0; i < shuffledArray.length; i += 1) {
    const arr: Array<WordModel> = [];
    const randomPostionForAnswer = getRandomInt(0, numberOfAnswers);
    const correctAnswer = shuffledArray[i];
    for (let j = 0; j < numberOfAnswers; j += 1) {
      if (randomPostionForAnswer === j) {
        arr.push(correctAnswer);
      } else {
        const word = getRandomWordExceptRight(list, correctAnswer);
        arr.push(word);
      }
    }
    result.push({ answers: arr, rightAnswer: randomPostionForAnswer, correctWord: correctAnswer });
  }
  return result;
};

export default getWrongAnswers;

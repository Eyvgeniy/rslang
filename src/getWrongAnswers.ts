export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const NUMBER_OF_ANSWERS = 4;
const result = [] as any;

const getWrongAnswers = (list: Array<any>, questions: any): Array<Array<any>> => {
  for (let i = 0; i < list.length; i += 1) {
    const arr = [] as Array<string>;
    const randomPostionForAnswer = getRandomInt(0, NUMBER_OF_ANSWERS);
    for (let j = 0; j < NUMBER_OF_ANSWERS; j += 1) {
      if (randomPostionForAnswer === j) {
        arr.push(questions[i].wordTranslate);
      } else {
        arr.push(list[getRandomInt(0, list.length)].wordTranslate);
      }
    }
    result.push({ answers: arr, rightAnswer: randomPostionForAnswer });
  }
  return result;
};

export default getWrongAnswers;

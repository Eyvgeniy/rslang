const NUMBER_OF_ANSWERS = 4;
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
const result = [] as Array<Array<string>>;
const getWrongAnswers = (list: Array<string>): Array<Array<string>> => {
  list.forEach((word, i, arr) => {
    const wrongAnswers = new Array(NUMBER_OF_ANSWERS)
      .fill(null)
      .map(() => arr[getRandomInt(0, arr.length)]);
    result.push(wrongAnswers);
  });
  return result;
};

export default getWrongAnswers;

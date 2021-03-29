import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import routes from './routes';
import getWrongAnswers from './getWrongAnswers';

fetch(routes.getWords(18))
  .then((responce) => responce.json())
  .then((words) => {
    const translations = words.map((word: Record<string, unknown>) => word.wordTranslate);
    console.log(getWrongAnswers(translations));
  });

ReactDOM.render(<App />, document.getElementById('root'));

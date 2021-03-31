import * as React from 'react';
import Safari from '../games/safari';
import routes from '../routes';
import WordsList from './WordsList/WordList';
import GroupNav from './GroupNav/GroupNav';
import './App.css';

const groups = [
  { name: 'Раздел 1', class: 'link1' },
  { name: 'Раздел 2', class: 'link2' },
  { name: 'Раздел 3', class: 'link3' },
  { name: 'Раздел 4', class: 'link4' },
  { name: 'Раздел 5', class: 'link5' },
  { name: 'Раздел 6', class: 'link6' },
];

const App = (): JSX.Element => {
  const [words, setWords] = React.useState([]);
  console.log('App render');

  React.useEffect(() => {
    fetch(routes.getWords())
      .then((responce) => responce.json())
      .then((wordsList) => {
        setWords(wordsList);
      });
  }, []);
  return (
    <div className="container">
      <GroupNav />
      <div className="book">{<WordsList words={words} />}</div>
    </div>
  );
};
export default App;

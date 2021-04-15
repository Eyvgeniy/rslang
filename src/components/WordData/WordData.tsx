import React from 'react';
import useSound from 'use-sound';
import { WordModel } from 'models/Words/WordModel';
import routes from '../../routes';

const WordData = ({ word }: { word: WordModel }): JSX.Element => {
  const [play] = useSound(routes.addHost(word?.audio));
  const [playExample] = useSound(routes.addHost(word?.audioExample));
  const [playMeaning] = useSound(routes.addHost(word?.audioMeaning));
  return (
    <div className='content'>
      <div className = 'content-word'>
      <p>{`Транскрипция ${word.transcription}`}</p>
      <img className='content-icon' src="https://img.icons8.com/nolan/64/speaker.png" onClick={() => play()} width='30px'/>
      <span>Перевод - <b>{word.wordTranslate}</b></span><br></br>
      <img className='content-icon' src="https://img.icons8.com/nolan/64/speaker.png" onClick={() => playMeaning()} width='30px'/>
      <span dangerouslySetInnerHTML={{ __html: `Значение - ${word.textMeaning}` }}></span>
      <p>{`Значение перевод - ${word.textMeaningTranslate}`}</p>
      <img className='content-icon' src="https://img.icons8.com/nolan/64/speaker.png" onClick={() => playExample()} width='30px'/>
      <span dangerouslySetInnerHTML={{ __html: `Применение - ${word.textExample}` }}></span>
      <p>{`Применение перевод - ${word.textExampleTranslate}`}</p>
      </div>
      <img className='word-image' src={routes.addHost(word.image)}/>
    </div>
  );
};

export default WordData;

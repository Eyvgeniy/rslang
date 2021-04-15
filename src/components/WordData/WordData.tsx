import React from 'react';
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { WordModel } from 'models/Words/WordModel';
import routes from '../../routes';

const WordData = ({ word }: { word: WordModel }): JSX.Element => {
  const [play] = useSound(routes.addHost(word?.audio));
  const [playExample] = useSound(routes.addHost(word?.audioExample));
  const [playMeaning] = useSound(routes.addHost(word?.audioMeaning));
  return (
    <div className='content'>
      <p>{`Транскрипция ${word.transcription}`}</p>
      <FontAwesomeIcon icon={faVolumeUp} onClick={() => play()} />
      <p>{`Перевод - ${word.wordTranslate}`}</p>
      <p dangerouslySetInnerHTML={{ __html: `Значение - ${word.textMeaning}` }}></p>
      <FontAwesomeIcon icon={faVolumeUp} onClick={() => playMeaning()} />
      <p>{`Значение перевод - ${word.textMeaningTranslate}`}</p>
      <p dangerouslySetInnerHTML={{ __html: `Применение - ${word.textExample}` }}></p>
      <FontAwesomeIcon icon={faVolumeUp} onClick={() => playExample()} />
      <p>{`Применение перевод - ${word.textExampleTranslate}`}</p>
      <img className='word-image' src={routes.addHost(word.image)} height='350px' width='450px' />
    </div>
  );
};

export default WordData;

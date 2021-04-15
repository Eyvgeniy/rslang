import React, {FunctionComponent} from "react";
import GameWrapper from "../components/GameWrapper/GameWrapper";
import { AppData, GameState } from "../../AppConstants";
import AudioChallengeGame from "./components/AudioChallengeGame";
import { useSelector } from "react-redux";
import { RootState } from '../../models/RootState';
import getWrongAnswers, { GameItem } from "../../getWrongAnswers";
import useSound from "use-sound";


const AudioChallenge: FunctionComponent<{}> = () => {
    const [gameState, setGameState] = React.useState(GameState.Start);
    const {words, allWords} = useSelector((state: RootState) => state.words);
    const [wordsForGame, setWordsForGame] = React.useState([] as GameItem[]);
    const [firstAudio, setFirstAudio] = React.useState(null);
    
    const handleGameStateChange = (newGameState: keyof(GameState)) => {
        setGameState(newGameState);
    }

    const [play, { isPlaying, sound }] = useSound(firstAudio);
    const startClickHandler = () => {
        if(sound && sound.state() !== 'unloaded'){
            play();
        }
    }  

    React.useEffect(() => {
        const answersForWords = getWrongAnswers(allWords, words, AppData.AudioChallengeNumberOfAnswers);
        setWordsForGame([answersForWords[0],answersForWords[1],answersForWords[2]]);
        setFirstAudio(AppData.Host + '/' + answersForWords[0]?.correctWord.audio)
    }, [words]);

    return (
        <GameWrapper
            gameName="Аудиовызов"
            gameDesription="Аудиовызов развивает навык восприятия английских слов на слух."
            onStateChangeHandler={handleGameStateChange}
            gameState={gameState}
            onStartClickHandler={startClickHandler}
        >
            <AudioChallengeGame 
                wordsForGame={wordsForGame}
                outSidePlaying={isPlaying && sound.state() !== 'unloaded'}
            />
        </GameWrapper>
    );
}

export default AudioChallenge;
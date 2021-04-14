import React, {FunctionComponent, useEffect} from "react";
import { GameItem } from "../../../getWrongAnswers";
import AudioChallengeRound from "./AudioChallengeRound";
import { WordModel } from "../../../models/Words/WordModel";
import useSound from "use-sound";
import { AppData, GameType } from "../../../AppConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./AudioChallengeRound.module.scss";
import GameStatistics from "../../components/Statistics/Statistics";

type AudioChallengeGameProps = {
    wordsForGame: GameItem[];
    outSidePlaying: boolean;
};

const AudioChallengeGame: FunctionComponent<AudioChallengeGameProps> = ({wordsForGame,outSidePlaying}) => {

    const [currentRound, setCurrentRound] = React.useState(0);
    const [correctWords, setCorrectWords] = React.useState([] as WordModel[]);
    const [wrongWords, setWrongWords] = React.useState([] as WordModel[]);
    const [currentSeries, setCurrentSeries] = React.useState(0);
    const [bestSeries, setBestSeries] = React.useState(0);

    const [currentGameItem, setCurrentGameItem] = React.useState(null as GameItem | null);
    const [shoudOpen, setShoudOpen] = React.useState(false);
    
    const [playNext, { isPlaying: isPlayngNext}] = useSound(AppData.Host + '/' + wordsForGame?.[currentRound + 1]?.correctWord.audio);
    const [play, { isPlaying }] = useSound(AppData.Host + '/' + wordsForGame?.[currentRound]?.correctWord.audio);

    const handleClick = (isCorrect: boolean, word: WordModel) => {
        let previosSeries = currentSeries;
        if(isCorrect){
            correctWords.push(word)
            setCorrectWords(correctWords);
            setCurrentSeries(currentSeries + 1);
            previosSeries++;
        }else{
            wrongWords.push(word)
            setWrongWords(wrongWords);
            setCurrentSeries(0);
        }
        if(bestSeries < previosSeries){
            setBestSeries(previosSeries);
        }

        setShoudOpen(true);
        setTimeout(()=> {
            setCurrentRound(currentRound + 1);
            playNext();
            setShoudOpen(false);
        }, 4000);
    }

    const handlePlayAgainClick = () => {
        play();
    }

    useEffect(() => {
        setCurrentGameItem(wordsForGame?.[currentRound] || null);
    }, [currentRound, wordsForGame])

    return (
        <div className={styles.game}>
            {currentGameItem && 
                <>
                    <div className={styles.question}>
                        {((outSidePlaying || isPlaying || isPlayngNext) && !shoudOpen) && 
                            <FontAwesomeIcon className={styles.questionIcon} icon={faVolumeUp}/>
                        }
                        {(!(outSidePlaying || isPlaying || isPlayngNext) && !shoudOpen)&& 
                            <FontAwesomeIcon className={styles.questionIcon} icon={faPlayCircle} onClick={handlePlayAgainClick}/>
                        }
                        {shoudOpen && 
                            <div className={styles.correctAnswerBlock}>
                                <img className={styles.correctAnswerImage} src={AppData.Host + '/' +currentGameItem.correctWord.image}/>
                                <span className={styles.correctAnswerText}>{currentGameItem.correctWord.word}</span>
                            </div>
                        }
                    </div>
                    <AudioChallengeRound 
                        item={wordsForGame[currentRound]}
                        onAnswerChooseHandler={handleClick}
                    />
                </>
            }
            {currentRound === wordsForGame.length && 
                <GameStatistics 
                    correctAnswers={correctWords}
                    mistakesAnswers={wrongWords}
                    bestSeriesLength={bestSeries} 
                    type={GameType.AudioChallenge}
                />
            }
        </div>
    );
}

export default AudioChallengeGame;
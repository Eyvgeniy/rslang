import React, {FunctionComponent, useEffect, useState} from "react";
import { GameItem } from "../../../getWrongAnswers";
import styles from "./AudioChallengeRound.module.scss";
import { WordModel } from "../../../models/Words/WordModel";

type OnAnswerChoose = (isCorrect: boolean, word: WordModel) => void;
type AudioChallengeRoundProps = {
    item: GameItem;
    onAnswerChooseHandler: OnAnswerChoose;
}

const AudioChallengeRound: FunctionComponent<AudioChallengeRoundProps> = ({item, onAnswerChooseHandler}) => {
    const [clickedIndex, setClickedIndex] = useState(null);
    const [prevItem, setPrevItem] = useState(null);


    if (item !== prevItem) {
        setClickedIndex(null);
        setPrevItem(item);
    }

    const handleAnswer = (index: number) => {
        if(clickedIndex !== null)
            return;
        setClickedIndex(index);
        onAnswerChooseHandler(index === item.rightAnswer, item.correctWord);
    }

    const getButtonClass = (index: number) => {
        let buttonClass = `${styles.buttonAnswer} `;
        if(clickedIndex === null)
            return buttonClass;
        
        if(clickedIndex === index){
            if(index === item.rightAnswer){
                buttonClass += styles.rightAnswer
            }else{
                buttonClass += styles.wrongAnswer
            }
        }
        if(clickedIndex !== index && index === item.rightAnswer){
            buttonClass += styles.rightAnswer
        }
        return buttonClass;
    }

    return(
        <>
        {item ? 
            (<div className={styles.answers}>
                {item.answers.map((answer, i) => {
                    return (
                        <button className={getButtonClass(i)} key={i} onClick={() => handleAnswer(i)}>{`${i + 1} ${answer.wordTranslate}`}</button>
                    );
                })}
            </div>) 
            : null
        }
        </>
    );
}

export default AudioChallengeRound;
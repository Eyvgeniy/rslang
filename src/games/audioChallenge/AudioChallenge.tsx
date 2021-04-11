import React, {FunctionComponent} from "react";
import GameWrapper from "../components/GameWrapper/GameWrapper";

const AudioChallenge: FunctionComponent<{}> = () => {

    return (
        <GameWrapper
            gameName="Аудиовызов"
            gameDesription="Аудиовызов развивает навык восприятия английских слов на слух."
        >
            <div className="audioChallenge">
            </div>
        </GameWrapper>
    );
}

export default AudioChallenge;
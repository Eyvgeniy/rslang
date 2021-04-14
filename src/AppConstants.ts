export class Auth{
    public static readonly COOKIE_TOKEN: string = 'COOKIE_TOKEN';
}

export class GameState {
    public static readonly WaitingAnswer = 'waitingAnswer';
    public static readonly Start = 'start';
}

export class GameType {
    public static readonly Savanna = 'savanna';
    public static readonly AudioChallenge = 'audioChallenge';
    public static readonly Sprint = 'sprint';
    public static readonly Cards = 'cards';
}

export class WordDifficulty{
    public static readonly Easy = 'easy';
    public static readonly Normal = 'easy';
    public static readonly Difficult = 'difficult';
}

export class AppData {
    public static readonly Host: string = 'https://eyvgeniy-rslang-be.herokuapp.com';

    public static readonly SavannaNumberOfAnswers: number = 4;
    public static readonly AudioChallengeNumberOfAnswers: number = 5;
}
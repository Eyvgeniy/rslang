export class Auth{
    public static readonly COOKIE_TOKEN: string = 'COOKIE_TOKEN';
}

export class GameState {
    public static readonly WaitingAnswer = 'waitingAnswer';
    public static readonly Start = 'start';
}

export class AppData {
    public static readonly Host: string = 'https://eyvgeniy-rslang-be.herokuapp.com';

    public static readonly SavannaNumberOfAnswers: number = 4;
    public static readonly AudioChallengeNumberOfAnswers: number = 5;
}
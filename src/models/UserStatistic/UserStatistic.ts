export interface UserStatisticsModel{
    learnedWords: number,
    optional?: UserStatisticsGameModel
}

export interface UserStatisticsRealModel{
    learnedWords: number,
    optional?: {
        value: string
    }
}

export interface UserStatisticsGameModel{
    savanna: UserStatisticsOptionalModel[],
    sprint: UserStatisticsOptionalModel[],
    cards: UserStatisticsOptionalModel[],
    audioChallenge: UserStatisticsOptionalModel[],
    [key: string]: UserStatisticsOptionalModel[]
}

export interface UserStatisticsOptionalModel{
    type: string,
    dateTime: string,
    learnWords: string[],
    answerCorrect: number,
    percentage: number,
    seriesLength: number,
    gamesCount: number
}
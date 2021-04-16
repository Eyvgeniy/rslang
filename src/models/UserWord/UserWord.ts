export interface UserWordModel extends UserWordCreateUpdateModel{
    id: string;
    wordId: string;
}

export interface UserWordCreateUpdateModel{
    difficulty: string;
    optional?: UserWordOptionalModel;
}

export interface UserWordOptionalModel{
    right: number;
    wrong: number;
}

export interface GetUserWordsRequestModel{
    userId: string,
    token: string,
}

export interface CreateUserWordsRequestModel{
    userId: string,
    wordId: string,
    token: string,
    word: UserWordCreateUpdateModel
}
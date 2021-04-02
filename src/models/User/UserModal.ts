export interface UserModel{
    name: string,
    id: string,
    email: string,
    photoFileName?: string
}

export interface SignInModel{
    email: string,
    password: string,
}

export interface SignInResponseModel{
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string,
}

export interface GetUserRequestModel{
    id: string,
    token: string,
}
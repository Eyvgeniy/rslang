import { UserModel } from "./User/UserModal";

export interface UserState {
    currentUser: UserModel | null;
    token: string | null;
    refreshToken: string | null;
    loading: boolean,
    error: string | null,
}
export interface RootState {
    user: UserState, 
}
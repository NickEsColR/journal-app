import { checkingCredentials } from "./authSlice";

export const checkingAuth = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
} 

export const startGoogleLogin = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}
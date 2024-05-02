import {
    registerUserWithEmailPassword,
    signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuth = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleLogin = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) {
            return dispatch(logout(result));
        }

        dispatch(login(result));
    };
};

export const startCreatingUserWithEmailPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await registerUserWithEmailPassword({
            email,
            password,
            displayName,
        });
        if (!result.ok) {
            return dispatch(logout(result));
        }

        dispatch(login(result));
    };
};
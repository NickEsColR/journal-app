import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credetials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;

        return {
            displayName,
            email,
            photoURL,
            uid,
            ok: true
        };
    }catch (error) {

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile(FirebaseAuth.currentUser,{displayName})

        return {
            displayName,
            email,
            photoURL,
            uid,
            ok: true
        }
    }catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = resp.user;

        return {
            uid,
            email,
            displayName,
            photoURL,
            ok: true
        }
    }catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
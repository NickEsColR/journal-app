import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
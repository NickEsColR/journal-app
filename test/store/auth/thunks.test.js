import {
    loginWithEmailPassword,
    logoutFirebase,
    signInWithGoogle,
} from "../../../src/firebase/providers";
import {
    checkingCredentials,
    login,
    logout,
} from "../../../src/store/auth/authSlice";
import {
    checkingAuth,
    startGoogleLogin,
    startLoginWithEmailPassword,
    startLogout,
} from "../../../src/store/auth/thunk";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers.js");

describe("Pruebas en auth Thunks", () => {
    const dispatch = jest.fn();

    const goodLoginData = {
        ok: true,
        ...demoUser,
    };

    const badLoginData = {
        ok: false,
        errorMessage: "Error",
    };

    const formData = {
        email: demoUser.email,
        password: "123456",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("debe  de invocar el checkingCredentials", async () => {
        await checkingAuth()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: "auth/checkingCredentials",
            payload: undefined,
        });
    });

    test("startGoogleLogin debe llamar checkingCredentials y login - exito", async () => {
        await signInWithGoogle.mockResolvedValue(goodLoginData);

        await startGoogleLogin()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            type: "auth/checkingCredentials",
            payload: undefined,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: "auth/login",
            payload: goodLoginData,
        });
    });

    test("startGoogleLogin debe llamar checkingCredentials y logout - error", async () => {
        await signInWithGoogle.mockResolvedValue(badLoginData);

        await startGoogleLogin()(dispatch);

        expect(dispatch).toHaveBeenCalledWith({
            type: "auth/checkingCredentials",
            payload: undefined,
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: "auth/logout",
            payload: badLoginData,
        });
    });

    test("startLoginWithEmailPassword debe de llamar checking credentials y login - exito", async () => {
        await loginWithEmailPassword.mockResolvedValue(goodLoginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(goodLoginData));
    });

    test("startLoginWithEmailPassword debe de llamar checking credentials y logout - error", async () => {
        await loginWithEmailPassword.mockResolvedValue(badLoginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(badLoginData));
    });

    test("startLogout debe de llamar el logoutFirebase, clearnNotes y logout", async () => {
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});

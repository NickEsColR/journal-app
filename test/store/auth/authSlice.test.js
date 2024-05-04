import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
    authenticatedState,
    demoUser,
    initialState,
    notAuthenticatedState,
} from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
    test('debe de regresar el estado inicial y llamarse "auth', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");
    });

    test("debe de realizar la autenticacion", () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual(authenticatedState);
    });

    test("debe de realizar el logout", () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState);
    });

    test("debe de realizar el logout y mostrar el mensaje de erro", () => {
        const errorMessage = "Error en el logout";
        const state = authSlice.reducer(
            authenticatedState,
            logout({ errorMessage })
        );
        expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
    });

    test("debe de cambiar el esxtado a checking",()=>{
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe("checking");
    })
});

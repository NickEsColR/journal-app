import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleLogin = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunk", () => ({
    startGoogleLogin: () => mockStartGoogleLogin,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState,
    },
});

describe("Pruebas en LoginPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("debe de mostrasr el componente correctamente", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    });

    test("debe llamar a googleLogin al hacer clic en el boton de google", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText("google-login");
        fireEvent.click(googleBtn);

        expect(mockStartGoogleLogin).toHaveBeenCalled();
    });

    test("debe llamar a startLoginWithEmailPassword al hacer submit del form", () => {
        const email = "test@test.com";
        const password = "123456";
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByRole("textbox", { name: "correo" });
        fireEvent.change(emailInput, {
            target: { name: "email", value: email },
        });

        const passwordInput = screen.getByTestId("password");
        fireEvent.change(passwordInput, {
            target: { name: "password", value: password },
        });

        const loginForm = screen.getByLabelText("login-form");
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password,
        });
    });
});

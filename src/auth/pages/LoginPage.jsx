import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
    Button,
    Grid,
    Typography,
    TextField,
    Link,
    Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import {
    startGoogleLogin,
    startLoginWithEmailPassword,
} from "../../store/auth";

const formInitialState = {
    email: "",
    password: "",
};

const formValidations = {
    email: [
        (value) => value.includes("@") && value.includes(".com"),
        "Debe ser un correo válido",
    ],
};

export const LoginPage = () => {
    const { status, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        email,
        password,
        onInputChange,
        emailInvalidMessage,
        formInvalidMsg,
    } = useForm(formInitialState, formValidations);

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!!formInvalidMsg) return;
        dispatch(startLoginWithEmailPassword({ email, password }));
    };

    const onGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };
    
    return (
        <AuthLayout title="Login">
            <form
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@google.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailInvalidMessage && formSubmitted}
                            helperText={emailInvalidMessage}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? "" : "none"}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isAuthenticating}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={onGoogleLogin}
                                disabled={isAuthenticating}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"} justifyContent="end">
                        <Link
                            component={RouterLink}
                            color={"inherit"}
                            to="/auth/register"
                        >
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

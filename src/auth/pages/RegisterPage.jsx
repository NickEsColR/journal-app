import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Grid,
    Typography,
    TextField,
    Link,
    Alert,
} from "@mui/material";
import { AuthLayout } from "../layout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunk";

const formInitialState = {
    displayName: "",
    email: "",
    password: "",
};

const formValidations = {
    email: [
        (value) => value.includes("@") && value.includes(".com"),
        "Debe ser un correo válido",
    ],
    password: [
        (value) => value.length >= 6,
        "La contraseña debe tener al menos 6 caracteres",
    ],
    displayName: [(value) => value.trim().length > 0, "El nombre es requerido"],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector((state) => state.auth);
    const isCheckingAuth = useMemo(() => status === "checking", [status]);

    const {
        formState,
        displayName,
        email,
        password,
        onInputChange,
        formInvalidMsg,
        displayNameInvalidMessage,
        emailInvalidMessage,
        passwordInvalidMessage,
    } = useForm(formInitialState, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if (!!formInvalidMsg) return;

        dispatch(startCreatingUserWithEmailPassword(formState));
    };

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre completo"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameInvalidMessage && formSubmitted}
                            helperText={displayNameInvalidMessage}
                        />
                    </Grid>
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
                            error={!!passwordInvalidMessage && formSubmitted}
                            helperText={passwordInvalidMessage}
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
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isCheckingAuth}
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"} justifyContent="end">
                        <Typography sx={{ mr: 1 }}>
                            ¿Ya tienes una cuenta?
                        </Typography>
                        <Link
                            component={RouterLink}
                            color={"inherit"}
                            to="/auth/login"
                        >
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

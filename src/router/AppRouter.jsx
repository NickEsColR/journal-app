import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { AuthRoutes } from "../auth";
import { JournalPage } from "../journal";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());

            const { uid, displayName, email, photoURL } = user;
            dispatch(login({ uid, displayName, email, photoURL }));
        });
    }, []);

    if (status === "checking") {
        return <CheckingAuth />;
    }
    return (
        <Routes>
            {status === "authenticated" ? (
                <Route path="/*" element={<JournalPage />} />
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};

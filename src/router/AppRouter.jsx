
import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks";
import { AuthRoutes } from "../auth";
import { JournalPage } from "../journal";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {
    const { status } = useCheckAuth();

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

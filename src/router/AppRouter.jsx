import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth";
import { JournalPage } from "../journal";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route path="/*" element={<JournalPage />} />
        </Routes>
    );
};

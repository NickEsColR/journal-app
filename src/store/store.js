import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { JournalSlice } from "./journal";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: JournalSlice.reducer
    }
})
import { createSlice } from "@reduxjs/toolkit";
import { update } from "firebase/database";

const initialState = {
    isSaving: true,
    messageSaved: "",
    notes: [],
    active: null,
};
// active: {
//     id: "123",
//     title: "Hello World",
//     body: "This is the body",
//     date: 1633142400000,
//     imageUls: []
// }

export const JournalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        addNewEmptyNote: (state, action) => {},
        setActiveNote: (state, action) => {},
        setNotes: (state, action) => {},
        setSaving: (state, action) => {},
        updateNote: (state, action) => {},
        deleteNoteById: (state, action) => {},
    },
});

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
} = JournalSlice.actions;

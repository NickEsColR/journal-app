import { createSlice } from "@reduxjs/toolkit";
import { update } from "firebase/database";

const initialState = {
    isSaving: false,
    messageSaved: "",
    notes: [],
    activeNote: null,
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
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload
            state.messageSaved = ""
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ""
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })

            state.messageSaved = `${action.payload.title}, guardado con éxito`
        },
        deleteNoteById: (state, action) => {},
    },
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
} = JournalSlice.actions;

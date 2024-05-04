import {
    JournalSlice,
    addNewEmptyNote,
    savingNewNote,
    setActiveNote,
} from "../../../src/store/journal/JournalSlice";
import { initialState, newEmptyNote } from "../../fixtures/journalFixtures";

describe("Pruebas en el journalSlice", () => {
    test('debe de regresar el estado inicial y llamarse "journal', () => {
        const state = JournalSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(JournalSlice.name).toBe("journal");
    });

    test("should save new note", () => {
        const state = JournalSlice.reducer(initialState, savingNewNote());
        const state2 = JournalSlice.reducer(
            state,
            addNewEmptyNote(newEmptyNote)
        );
        const state3 = JournalSlice.reducer(
            state2,
            setActiveNote(newEmptyNote)
        );

        expect(state.isSaving).toBe(true);

        expect(state2.notes.length).toBe(1);
        expect(state2.notes[0]).toEqual(newEmptyNote);
        expect(state2.isSaving).toEqual(false);

        expect(state3.activeNote).toEqual(newEmptyNote);
    });
});

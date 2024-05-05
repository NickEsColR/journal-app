import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();

    const emptyNote = {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
    }

    const uid = 'TEST-UID';

    const clearFirestore = async() => {
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = []
        docs.forEach(doc => {
            deletePromises.push(deleteDoc(doc.ref));
        });
        await Promise.all(deletePromises);
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('startNewNote debe de crear una nueva nota en blanco', async() => { 
        getState.mockReturnValue({auth: {uid:uid },})
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote())
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(emptyNote))           
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(emptyNote))

        await clearFirestore()
    })
})
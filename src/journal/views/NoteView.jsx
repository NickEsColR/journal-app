import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote } from "../../store/journal";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote,isSaving } = useSelector((state) => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSavingNote());
    };

    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight={"light"}>
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ mb: 1, border: "none" }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    sx={{ mb: 1, border: "none" }}
                    minRows={4}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image Gallery */}
            <ImageGallery />
        </Grid>
    );
};

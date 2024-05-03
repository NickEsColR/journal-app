import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote, isSaving, messageSaved } = useSelector(
        (state) => state.journal
    );

    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire("Nota actualizada", messageSaved, "success");
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSavingNote());
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
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
                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>
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

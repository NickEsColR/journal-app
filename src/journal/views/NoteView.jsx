import { useSelector } from "react-redux";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useMemo } from "react";

export const NoteView = () => {

    const {activeNote} = useSelector(state => state.journal)

    const {body, title, date, onInputChange} = useForm(activeNote)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])
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
                <Button color="primary" sx={{ padding: 2 }}>
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
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image Gallery */}
            <ImageGallery />
        </Grid>
    );
};

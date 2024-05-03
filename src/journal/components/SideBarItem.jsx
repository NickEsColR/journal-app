import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";

import { setActiveNote } from "../../store/journal/JournalSlice";

export const SideBarItem = ({title, body, id}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(()=>{
        return title.length > 17 ? title.substring(0, 17) + '...': title;
    }, [title])

    const onClickItem = () => {
        dispatch(setActiveNote({id, title, body}));
    }
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickItem}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};

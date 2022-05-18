import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteItemFormContext } from '../../context/deleteItemFormContext';
import { DeleteItemFormContextType } from '../../types/generalTypes';
import { TasksContext } from '../../context/tasksContext';
import { TasksContextType } from '../../types/tasksTypes';
import { EventsContextType } from '../../types/eventsTypes';
import { EventsContext } from '../../context/eventsContext';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { TextField } from "@mui/material";


interface SearchFieldProps {
    search: string;
    setSearch(newSearch: string): void;
}

function SearchField({ search, setSearch }: SearchFieldProps) {

    return (
        <TextField label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
    );
};

export default SearchField;
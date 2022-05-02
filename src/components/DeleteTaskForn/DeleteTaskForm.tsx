import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../context/tasksContext';
import { TodoContextType } from '../../types/todoTypes';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


interface DeleteTaskFormProps {
    id: string;
    handleCloseDeleteTaskDialog(): void;
    handleDeleteTask(id: string): void;
}

const DeleteTaskForm = ({ handleCloseDeleteTaskDialog, handleDeleteTask, id }: DeleteTaskFormProps) => {

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Delete tasks</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this task ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteTaskDialog} variant="outlined" color="secondary" >
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={() => handleDeleteTask(id)} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteTaskForm;
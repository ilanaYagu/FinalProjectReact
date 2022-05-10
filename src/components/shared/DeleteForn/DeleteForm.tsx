import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteTaskFormProps<T> {
    item: T;
    handleCloseDeleteTaskDialog(): void;
    handleDelete(item: T): void;
}

function DeleteForm<T>({ handleCloseDeleteTaskDialog, item, handleDelete }: DeleteTaskFormProps<T>) {

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteTaskDialog} variant="outlined" color="secondary" >
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={() => handleDelete(item)} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteForm;
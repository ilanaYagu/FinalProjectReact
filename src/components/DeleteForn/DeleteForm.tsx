import React, { useContext } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteItemFormContext } from '../../context/DeleteItemFormContext';
import { DeleteItemFormContextType } from '../../types/generalTypes';


interface DeleteTaskFormProps<T> {
    item: T;
    handleDelete(item: T): void;
}

function DeleteForm<T>({ item, handleDelete }: DeleteTaskFormProps<T>) {
    const { handleCloseDeleteDialog } = useContext(DeleteItemFormContext) as DeleteItemFormContextType;

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteDialog} variant="outlined" color="secondary" >
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
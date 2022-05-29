import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteTask } from "../../feature/tasksSlice";
import { deleteEvent } from "../../feature/eventsSlice";
import { handleCloseDeleteDialog } from "../../feature/deleteItemFormSlice";
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { makeStyles } from '@mui/styles';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';

interface DeleteItemFormProps {
    item: Basic;
}

const useStyles = makeStyles({
    dialogActions: {
        justifyContent: "center !important",
        marginTop: "8%"
    }
});

function DeleteItemForm({ item }: DeleteItemFormProps) {
    const classes = useStyles();
    const isDeleteDialogOpen = useSelector((state: RootState) => state.deleteItemForm.isDeleteDialogOpen);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (): void => {
        item instanceof Task ?
            dispatch(deleteTask(item.id)) : dispatch(deleteEvent(item.id));
        dispatch(handleCloseDeleteDialog());
    }

    return (
        <Dialog open={isDeleteDialogOpen} >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "{item.title}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={() => dispatch(handleCloseDeleteDialog())} variant="outlined" color="secondary" >
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={() => handleDelete()} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteItemForm;
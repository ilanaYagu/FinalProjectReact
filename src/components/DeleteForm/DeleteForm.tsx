import { useContext } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteItemFormContext, DeleteItemFormContextType } from '../../context/deleteItemFormContext';
import { TasksContext, TasksContextType } from '../../context/tasksContext';
import { EventsContext, EventsContextType } from '../../context/eventsContext';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { makeStyles } from '@mui/styles';

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
    const { handleCloseDeleteDialog, isDeleteDialogOpen } = useContext(DeleteItemFormContext) as DeleteItemFormContextType;
    const { deleteTask } = useContext(TasksContext) as TasksContextType;
    const { deleteEvent } = useContext(EventsContext) as EventsContextType;

    const handleDelete = (): void => {
        item instanceof Task ?
            deleteTask(item.id) : deleteEvent(item.id);
        handleCloseDeleteDialog();
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
                <Button onClick={handleCloseDeleteDialog} variant="outlined" color="secondary" >
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
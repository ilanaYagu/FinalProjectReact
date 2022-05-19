import { useContext } from 'react';
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

interface DeleteItemFormProps {
    item: Basic;
}

function DeleteItemForm({ item }: DeleteItemFormProps) {
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
                    Are you sure you want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
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
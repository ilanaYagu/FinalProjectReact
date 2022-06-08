import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteTask } from "../../feature/tasksSlice";
import { deleteEvent } from "../../feature/eventsSlice";
import { BasicItem } from '../../classes/BasicItem';
import { Task } from '../../classes/Task';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';

interface DeleteItemFormProps {
    item: BasicItem;
    open: boolean;
    handleClose: () => void;
}

function DeleteItemForm({ item, handleClose, open }: DeleteItemFormProps) {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (): void => {
        item instanceof Task ?
            dispatch(deleteTask(item._id)) : dispatch(deleteEvent(item._id));
        handleClose();
    }

    return (
        <Dialog open={open} >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete "{item.title}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
                <Button onClick={() => handleClose()} variant="outlined" color="secondary" >
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
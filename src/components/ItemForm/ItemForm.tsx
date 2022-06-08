import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PriorityType, StatusType } from '../../types/tasksTypes';
import { updateTask, addTask } from "../../feature/tasksSlice";
import { updateEvent, addEvent } from '../../feature/eventsSlice';
import { BasicItem } from '../../classes/BasicItem';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import TaskForm from './TaskForm';
import EventForm from './EventForm';
import validator from "validator";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ItemType } from '../../types/managementTableTypes';
import { pink } from '@mui/material/colors';

export type TaskInputs = Omit<Task, "_id" | "title" | "description">;
export type EventInputs = Omit<Event, "_id" | "title" | "description">;

interface ItemFormProps {
    type: ItemType;
    enableSwitchType?: boolean;
    open: boolean;
    handleClose: () => void;
    itemToUpdate?: BasicItem;
}

const useStyles = makeStyles({
    dialog: {
        height: "60%",
        width: "20%"
    },
    chooseTypeTitle: {
        marginRight: "5%"
    },
    formField: {
        width: "85%",
        backgroundColor: "inherit",
        color: "white"
    }
});

const ItemForm = ({ type, enableSwitchType, open, handleClose, itemToUpdate }: ItemFormProps) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    let [baseInputs, setBaseInputs] = useState<BasicItem>({ title: "", _id: "", description: "" })
    let [taskInputs, setTaskInputs] = useState<TaskInputs>({
        status: StatusType.Open, estimatedTime: "", priority: PriorityType.Low,
        review: " ", timeSpent: "", untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<EventInputs>({
        beginningTime: "", endingTime: "", color: pink[200], location: "",
        notificationTime: "", invitedGuests: []
    })
    let [buttonText, setButtonText] = useState<string>("");
    let [formType, setFormType] = useState<ItemType>(type);

    useEffect(() => {
        if (itemToUpdate) {
            setButtonText("Update");
            setBaseInputs({ ...baseInputs, _id: itemToUpdate._id, title: itemToUpdate.title, description: itemToUpdate.description });
            if (itemToUpdate instanceof Task)
                setTaskInputs({ ...taskInputs, status: itemToUpdate.status, estimatedTime: itemToUpdate.estimatedTime, priority: itemToUpdate.priority, timeSpent: itemToUpdate.timeSpent, untilDate: itemToUpdate.untilDate, review: itemToUpdate.review })
            else if (itemToUpdate instanceof Event) {
                setEventInputs({ ...eventInputs, color: itemToUpdate.color, beginningTime: itemToUpdate.beginningTime, endingTime: itemToUpdate.endingTime, location: itemToUpdate.location, notificationTime: itemToUpdate.notificationTime, invitedGuests: itemToUpdate.invitedGuests })
            }
        } else {
            setButtonText("Create");
        }
    }, []);

    const formSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (isValidFields()) {
            if (!itemToUpdate) {
                formType as string === ItemType.Task ?
                    dispatch(addTask({ ...taskInputs, ...baseInputs })) :
                    dispatch(addEvent({ ...eventInputs, ...baseInputs }));
            }
            else {
                formType as string === ItemType.Task ?
                    dispatch(updateTask({ ...taskInputs, ...baseInputs })) :
                    dispatch(updateEvent({ ...eventInputs, ...baseInputs }));
            }
            handleClose();
        }
    }

    const isValidFields = (): boolean => {
        let isValid: boolean = true;
        if (validator.trim(baseInputs.title) === "" || validator.trim(baseInputs.description) === "") {
            alert("Please fill the Required Fields");
        }
        if (formType === ItemType.Event) {
            if (validator.trim(eventInputs.beginningTime) === "" || validator.trim(eventInputs.endingTime) === "" || new Date(eventInputs.beginningTime) > new Date(eventInputs.endingTime)) {
                alert("Please check your beginning and ending times");
                isValid = false;
            }
        } else if (formType === ItemType.Task) {
            if (taskInputs.priority === PriorityType.Top && validator.trim(taskInputs.untilDate) === "") {
                alert("Please check your until date, it is an top task!");
                isValid = false
            }
        }
        return isValid;
    }

    const getBaseDetails = (): JSX.Element =>
        <>
            <TextField className={classes.formField} margin="normal" label="Title" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, title: event.target.value })} defaultValue={baseInputs.title} required />
            Description * : <TextareaAutosize minRows={3} maxRows={5} className={classes.formField} placeholder="Enter desc..." defaultValue={baseInputs.description}
                onChange={(event: React.FormEvent) => setBaseInputs({ ...baseInputs, description: (event.target as HTMLInputElement).value })} required />
        </>

    const getDialogActions = (): JSX.Element =>
        <DialogActions sx={{ justifyContent: "center", mt: "8%" }}>
            <Button onClick={handleClose} color="secondary" variant="outlined"> Cancel </Button>
            <Button onClick={formSubmit} color="primary" type="submit" variant="contained"> {buttonText} </Button>
        </DialogActions>

    const getSwitchType = () =>
        (enableSwitchType && !itemToUpdate) &&
        <>
            <span className={classes.chooseTypeTitle}>Choose Type:</span>
            <Select value={formType} label="Type" onChange={(event: SelectChangeEvent<string>) => setFormType(event.target.value as ItemType)}>
                {
                    Object.values(ItemType).map((typeOption) =>
                        <MenuItem value={typeOption}>{typeOption}</MenuItem>
                    )
                }
            </Select>
        </>

    return (
        <Dialog open={open} classes={{ paper: classes.dialog }} scroll="paper">
            <DialogTitle>{buttonText + " " + formType} </DialogTitle>
            <DialogContent>
                <DialogContentText> Details: </DialogContentText>
                {getSwitchType()}
                {getBaseDetails()}
                {
                    formType === ItemType.Task ?
                        <TaskForm taskInputs={taskInputs} setTaskInputs={setTaskInputs} classField={classes.formField} />
                        :
                        <EventForm eventInputs={eventInputs} setEventInputs={setEventInputs} classField={classes.formField} />
                }
            </DialogContent>
            {getDialogActions()}
        </Dialog >
    );
};

export default ItemForm;



import React, { useContext, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { makeStyles } from "@mui/styles";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Priority, Status, TasksContextType } from '../../types/tasksTypes';
import { Type } from '../../constants/constants';
import { TasksContext } from '../../context/tasksContext';
import { EventsContextType } from '../../types/eventsTypes';
import { createColor } from 'material-ui-color';
import { EventsContext } from '../../context/eventsContext';
import { ItemFormContextType } from '../../types/generalTypes';
import { ItemFormContext } from '../../context/itemFormContext';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import TaskForm from './TaskForm';
import EventForm from './EventForm';
import validator from "validator";

interface ItemFormProps {
    type: Type;
    enableSwitchType?: boolean;
}

const useStyles = makeStyles({
    dialog: {
        height: "60%",
        width: "20%"
    },
    chooseTypeTitle: {
        marginRight: "5% !important"
    },
    dialogActions: {
        justifyContent: "center !important",
        marginTop: "8%"
    },
    formField: {
        width: "85% !important",
        marginTop: "5% !important",
        marginBottom: "5% !important",
        backgroundColor: "inherit",
        color: "white"
    }
});

const ItemForm = ({ type, enableSwitchType }: ItemFormProps) => {
    const classes = useStyles();
    const { addTask, updateTask } = useContext(TasksContext) as TasksContextType;
    const { addEvent, updateEvent } = useContext(EventsContext) as EventsContextType;
    const { handleCloseDialog, itemToUpdate, isFormDialogOpen } = useContext(ItemFormContext) as ItemFormContextType;

    let [baseInputs, setBaseInputs] = useState<Basic>({ title: "", id: "", description: "" })
    let [taskInputs, setTaskInputs] = useState<Omit<Task, "id" | "title" | "description">>({
        status: Status.Open, estimatedTime: "", priority: Priority.Low,
        review: " ", timeSpent: "", untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<Omit<Event, "id" | "title" | "description">>({
        beginningTime: "", endingTime: "", color: createColor("#DFBEBE"), location: "",
        notificationTime: "", invitedGuests: []
    })
    let [buttonText, setButtonText] = useState<string>("");
    let [formType, setFormType] = useState<Type>(type);

    useEffect(() => {
        if (!itemToUpdate) {
            setButtonText("Create");
        } else {
            setButtonText("Update");
            setBaseInputs({ ...baseInputs, id: itemToUpdate.id, title: itemToUpdate.title, description: itemToUpdate.description });
            if (itemToUpdate instanceof Task)
                setTaskInputs({ ...taskInputs, status: itemToUpdate.status, estimatedTime: itemToUpdate.estimatedTime, priority: itemToUpdate.priority, timeSpent: itemToUpdate.timeSpent, untilDate: itemToUpdate.untilDate, review: itemToUpdate.review })
            else if (itemToUpdate instanceof Event)
                setEventInputs({ ...eventInputs, color: itemToUpdate.color, beginningTime: itemToUpdate.beginningTime, endingTime: itemToUpdate.endingTime, location: itemToUpdate.location, notificationTime: itemToUpdate.notificationTime, invitedGuests: itemToUpdate.invitedGuests })
        }
    }, []);

    const formSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (isValidFields()) {
            if (!itemToUpdate) {
                formType as string === Type.Task ?
                    addTask({ ...taskInputs, ...baseInputs }) :
                    addEvent({ ...eventInputs, ...baseInputs });
                handleCloseDialog();
            }
            else {
                formType as string === Type.Task ?
                    updateTask({ ...taskInputs, ...baseInputs }) :
                    updateEvent({ ...eventInputs, ...baseInputs });
                handleCloseDialog();
            }
        }
    }

    const isValidFields = (): boolean => {
        let isValid: boolean = true;
        if (validator.trim(baseInputs.id) === "" || validator.trim(baseInputs.title) === "" || validator.trim(baseInputs.description) === "") {
            alert("Please fill the Required Fields");
        }
        if (formType === Type.Event) {
            if (validator.trim(eventInputs.beginningTime) === "" || validator.trim(eventInputs.endingTime) === "" || new Date(eventInputs.beginningTime) > new Date(eventInputs.endingTime)) {
                alert("Please check your beginning and ending times");
                isValid = false;
            }
        } else if (formType === Type.Task) {
            if (taskInputs.priority === Priority.Top && validator.trim(taskInputs.untilDate) === "") {
                alert("Please check your until date, it is an top task!");
                isValid = false
            }
        }
        return isValid;
    }

    const renderBaseDetails = (): JSX.Element => {
        return <>
            <TextField className={classes.formField} label="ID" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, id: event.target.value })} defaultValue={baseInputs.id} disabled={itemToUpdate ? true : false} required />
            <TextField className={classes.formField} label="Title" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, title: event.target.value })} defaultValue={baseInputs.title} required />
            Description * : <TextareaAutosize minRows={3} maxRows={5} className={classes.formField} placeholder="Enter desc..." defaultValue={baseInputs.description}
                onChange={(event: React.FormEvent) => setBaseInputs({ ...baseInputs, description: (event.target as HTMLInputElement).value })} required />
        </>
    }

    const renderDialogActions = (): JSX.Element => {
        return <DialogActions className={classes.dialogActions}>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined"> Cancel </Button>
            <Button color="primary" type="submit" variant="contained"> {buttonText} </Button>
        </DialogActions>
    }

    const renderSwitchType = () => {
        return (enableSwitchType && !itemToUpdate) &&
            <>
                <span className={classes.chooseTypeTitle}>Choose Type:</span>
                <Select value={formType} label="Type" onChange={(event: SelectChangeEvent<string>) => setFormType(event.target.value as Type)}>
                    {
                        Object.values(Type).map((typeOption) =>
                            <MenuItem value={typeOption}>{typeOption}</MenuItem>
                        )
                    }
                </Select>
            </>
    }

    return (
        <Dialog open={isFormDialogOpen} onClose={handleCloseDialog} classes={{ paper: classes.dialog }}>
            <DialogTitle>{buttonText + " " + formType} </DialogTitle>
            <form onSubmit={formSubmit}>
                <DialogContent>
                    <DialogContentText> Details: </DialogContentText>
                    {renderSwitchType()}
                    {renderBaseDetails()}
                    {
                        formType === "Task" ?
                            <TaskForm taskInputs={taskInputs} setTaskInputs={setTaskInputs} classField={classes.formField} />
                            :
                            <EventForm eventInputs={eventInputs} setEventInputs={setEventInputs} classField={classes.formField} />
                    }
                </DialogContent>
                {renderDialogActions()}
            </form>
        </Dialog >
    );
};

export default ItemForm;



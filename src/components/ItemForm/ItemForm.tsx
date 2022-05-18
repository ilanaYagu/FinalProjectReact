import React, { useContext, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import validator from "validator";
import { Autocomplete, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Priority, Status, TasksContextType } from '../../types/tasksTypes';
import { priorityOptions, statusesOptions, Type } from '../../constants/constants';
import { TasksContext } from '../../context/tasksContext';
import { EventsContextType } from '../../types/eventsTypes';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import { EventsContext } from '../../context/eventsContext';
import { ItemFormContextType, ItemFormType } from '../../types/generalTypes';
import InvitedGuestsField from './InvitedGuestsField';
import { ItemFormContext } from '../../context/itemFormContext';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';

const itemFormTypeOptions: ItemFormType[] = ["Task", "Event"];

interface ItemFormProps {
    type: ItemFormType;
    enableSwitchType?: boolean;
}

const useStyles = makeStyles(() => createStyles({
    dialog: {
        height: 600,
        width: 350
    },
    chooseTypeTitle: {
        marginRight: "5% !important"
    },
    colorPicker: {
        color: "aliceblue !important",
        borderBottom: "1px solid rgba(228, 218, 218, 0.42) !important"
    },
    dialogActions: {
        justifyContent: "center !important",
        marginTop: "8%"
    },
    formField: {
        width: "85% !important",
        marginTop: "5% !important",
        marginBottom: "5% !important"
    }
}));

const ItemForm = ({ type, enableSwitchType }: ItemFormProps) => {
    const classes = useStyles();
    const { addTask, updateTask, getTask } = useContext(TasksContext) as TasksContextType;
    const { addEvent, updateEvent, getEvent } = useContext(EventsContext) as EventsContextType;
    const { handleCloseDialog, itemToUpdate } = useContext(ItemFormContext) as ItemFormContextType;

    let [baseInputs, setBaseInputs] = useState<Basic>({
        title: "",
        id: "",
        description: "",
    })
    let [taskInputs, setTaskInputs] = useState<Omit<Task, "id" | "title" | "description">>({
        status: "Open",
        estimatedTime: "",
        priority: "Low",
        review: " ",
        timeSpent: "",
        untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<Omit<Event, "id" | "title" | "description">>({
        beginningTime: "",
        endingTime: "",
        color: createColor("red"),
        location: "",
        notificationTime: "",
        invitedGuests: []
    })
    let [buttonText, setButtonText] = useState<string>("");
    let [formType, setFormType] = useState<ItemFormType>(type);

    useEffect(() => {
        if (!itemToUpdate) {
            setButtonText("Create");
        } else {
            setButtonText("Update");
            let item: Task | Event | undefined = formType === "Task" ? getTask(itemToUpdate.id) : getEvent(itemToUpdate.id);
            console.log(item)
            if (item) {
                setBaseInputs({ ...baseInputs, id: item.id, title: item.title, description: item.description });
                (item instanceof Task) ?
                    setTaskInputs({ ...taskInputs, status: item.status, estimatedTime: item.estimatedTime, priority: item.priority, timeSpent: item.timeSpent, untilDate: item.untilDate, review: item.review })
                    :
                    setEventInputs({ ...eventInputs, color: item.color, beginningTime: item.beginningTime, endingTime: item.endingTime, location: item.location, notificationTime: item.notificationTime, invitedGuests: item.invitedGuests })
            }
        }
    }, []);

    const formSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (isValidFileds()) {
            if (!itemToUpdate) {
                formType === Type.Task ?
                    addTask({ ...taskInputs, ...baseInputs }) :
                    addEvent({ ...eventInputs, ...baseInputs });
                handleCloseDialog();
            }
            else {
                formType === Type.Task ?
                    updateTask({ ...taskInputs, ...baseInputs }) :
                    updateEvent({ ...eventInputs, ...baseInputs });
                handleCloseDialog();
            }
        }
    }

    const isValidFileds = (): boolean => {
        let isValid = false;
        if (
            validator.trim(baseInputs.id) === "" ||
            validator.trim(baseInputs.title) === "" ||
            validator.trim(baseInputs.description) === "" ||
            (formType === "Event" && validator.trim(eventInputs.beginningTime) === "") ||
            (formType === "Event" && validator.trim(eventInputs.endingTime) === "")
        ) {
            alert("Please fill the Required Fields");
        }
        else if (formType === "Event" && new Date(eventInputs.beginningTime) > new Date(eventInputs.endingTime)) {
            alert("Please check your beginning and ending times");
        } else {
            isValid = true;
        }
        return isValid;
    }

    const renderTaskDetails = (): JSX.Element => {
        return <>
            <Autocomplete freeSolo disableClearable className={classes.formField} defaultValue={taskInputs.status} options={statusesOptions.map((option: Status) => option)}
                onChange={(event: React.FormEvent) => {
                    let newStatus: Status = (event.target as HTMLInputElement).textContent as Status;
                    newStatus = !statusesOptions.includes(newStatus) ? "Open" : newStatus;
                    setTaskInputs({ ...taskInputs, status: newStatus, review: newStatus !== "Done" ? "" : taskInputs.review })
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Status" InputProps={{ ...params.InputProps, type: 'search' }} />
                )}
            />
            <TextField className={classes.formField} label="Estimated Time" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} defaultValue={taskInputs.estimatedTime} />
            <Autocomplete freeSolo disableClearable className={classes.formField} defaultValue={taskInputs.priority} options={priorityOptions.map((option: Priority) => option)}
                onChange={(event: React.FormEvent) => {
                    let newPriority: Priority = (event.target as HTMLInputElement).textContent as Priority;
                    newPriority = !priorityOptions.includes(newPriority) ? "Low" : newPriority;
                    setTaskInputs({ ...taskInputs, priority: newPriority, untilDate: newPriority !== "Top" ? "" : taskInputs.untilDate })
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Priority" InputProps={{ ...params.InputProps, type: 'search' }} />
                )}
            />
            {
                taskInputs.priority === "Top" &&
                <TextField className={classes.formField} label="Until Date" type="datetime-local" defaultValue={taskInputs.untilDate} sx={{ width: "85%" }}
                    InputLabelProps={{ shrink: true }} value={taskInputs.untilDate?.replace(" ", "T")}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setTaskInputs({ ...taskInputs, untilDate: event.target.value.replace("T", " ") });
                    }} />
            }
            {
                taskInputs.status === "Done" &&
                <>
                    Review: <TextareaAutosize className={classes.formField} placeholder="Enter review..." defaultValue={taskInputs.review}
                        onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })}
                        style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }} required />
                    <TextField label="Time spent" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} defaultValue={taskInputs.timeSpent} />
                </>
            }
        </>;
    }

    const renderEventDetails = (): JSX.Element => {
        return <>
            <ColorPicker value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })} />
            <TextField className={classes.formField} label="Beginning Time" type="datetime-local" defaultValue={eventInputs.beginningTime}
                InputLabelProps={{ shrink: true }} value={eventInputs.beginningTime.replace(" ", "T")}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setEventInputs({ ...eventInputs, beginningTime: event.target.value.replace("T", " ") });
                }} />
            <TextField className={classes.formField} label="Ending Time" type="datetime-local" defaultValue={eventInputs.endingTime}
                InputLabelProps={{ shrink: true }} value={eventInputs.endingTime.replace(" ", "T")}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setEventInputs({ ...eventInputs, endingTime: event.target.value.replace("T", " ") });
                }} />
            <TextField className={classes.formField} label="Notification Time" type="datetime-local" defaultValue={eventInputs.notificationTime}
                InputLabelProps={{ shrink: true }} value={eventInputs.notificationTime?.replace(" ", "T")}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setEventInputs({ ...eventInputs, notificationTime: event.target.value.replace("T", " ") });
                }} />
            <TextField className={classes.formField} label="Location" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} defaultValue={eventInputs.location} />
            <div>Invited Guests:</div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
        </>
    }

    const renderBaseDetails = (): JSX.Element => {
        return <>
            <TextField className={classes.formField} label="ID" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, id: event.target.value })} defaultValue={baseInputs.id} disabled={itemToUpdate ? true : false} required />
            <TextField className={classes.formField} label="Title" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBaseInputs({ ...baseInputs, title: event.target.value })} defaultValue={baseInputs.title} required />
            Description * : <TextareaAutosize className={classes.formField} placeholder="Enter desc..." defaultValue={baseInputs.description}
                onChange={(event: React.FormEvent) => setBaseInputs({ ...baseInputs, description: (event.target as HTMLInputElement).value })}
                style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }} required />
        </>
    }

    const renderDialogActions = (): JSX.Element => {
        return <DialogActions className={classes.dialogActions}>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined"> Cancel </Button>
            <Button color="primary" type="submit" variant="contained"> {buttonText} </Button>
        </DialogActions>
    }


    return (
        <Dialog
            open={true} onClose={handleCloseDialog} style={{ alignItems: "center" }} classes={{ paper: classes.dialog }}>
            <DialogTitle>{buttonText + " " + formType} </DialogTitle>
            <form onSubmit={formSubmit}>
                <DialogContent>
                    <DialogContentText> Details: </DialogContentText>
                    <div>
                        {
                            (enableSwitchType && !itemToUpdate) &&
                            <>
                                <span className={classes.chooseTypeTitle}>Choose Type:</span>
                                <Select
                                    value={formType} label="Type"
                                    onChange={(event: SelectChangeEvent<string>) => setFormType(event.target.value as ItemFormType)}>
                                    {
                                        itemFormTypeOptions.map((typeOption) =>
                                            <MenuItem value={typeOption}>{typeOption}</MenuItem>
                                        )
                                    }
                                </Select>
                            </>
                        }
                        {renderBaseDetails()}
                        {
                            formType === "Task" ?
                                renderTaskDetails()
                                : renderEventDetails()
                        }
                    </div>
                </DialogContent>
                {renderDialogActions()}
            </form>

        </Dialog >
    );
};

export default ItemForm;



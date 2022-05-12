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
import makeStyles from '@mui/styles/makeStyles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { IPriority, IStatus, ITask, TasksContextType } from '../../types/tasksTypes';
import { priorityOptions, statusesOptions } from '../../constants/constants';
import { TasksContext } from '../../context/tasksContext';
import { EventsContextType, IEvent } from '../../types/eventsTypes';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import { EventsContext } from '../../context/eventsContext';
import { IBasicType, ItemFormContextType, ItemFormType } from '../../types/generalTypes';
import InvitedGuestsFiled from './InvitedGuestsFiled';
import { ItemFormContext } from '../../context/itemFormContext';
import './ItemUpdateAndCreateForm.css';

const itemFormTypeOptions: ItemFormType[] = ["Task", "Event"];

interface ItemUpdateAndCreateFormProps {
    type: ItemFormType;
    enableSwitchType?: boolean;
}

const useStyles = makeStyles(() => ({
    dialog: {
        height: 600,
        width: 350
    }
}));

const ItemUpdateAndCreateForm = ({ type, enableSwitchType }: ItemUpdateAndCreateFormProps) => {
    const classes = useStyles();
    const { addTask, updateTask, getTask } = useContext(TasksContext) as TasksContextType;
    const { addEvent, updateEvent, getEvent } = useContext(EventsContext) as EventsContextType;
    const { handleCloseDialog, itemToUpdate } = useContext(ItemFormContext) as ItemFormContextType;

    let [sharedInputs, setSharedInputs] = useState<IBasicType>({
        title: "",
        id: "",
        description: "",
    })
    let [taskInputs, setTaskInputs] = useState<Omit<ITask, "id" | "title" | "description">>({
        status: "Open",
        estimatedTime: "",
        priority: "Low",
        review: " ",
        timeSpent: "",
        untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<Omit<IEvent, "id" | "title" | "description">>({
        beginningTime: "",
        endingTime: "",
        color: createColor("red"),
        location: "",
        notificationTime: "",
        invitedGuests: []
    })
    let [buttonText, setButtonText] = useState<string>("");
    let [formType, setFormType] = useState<ItemFormType>(type);
    let [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (!itemToUpdate) {
            setButtonText("Create");
        } else {
            setButtonText("Update");
            let item: ITask | IEvent | null = formType === "Task" ? getTask(itemToUpdate.id) : getEvent(itemToUpdate.id);
            setDisabled(true);
            if (item) {
                setSharedInputs({ ...sharedInputs, id: item.id, title: item.title, description: item.description });
                ("priority" in item) ?
                    setTaskInputs({ ...taskInputs, status: item.status, estimatedTime: item.estimatedTime, priority: item.priority, timeSpent: item.timeSpent, untilDate: item.untilDate, review: item.review })
                    :
                    setEventInputs({ ...eventInputs, color: item.color, beginningTime: item.beginningTime, endingTime: item.endingTime, location: item.location, notificationTime: item.notificationTime, invitedGuests: item.invitedGuests })
            }
        }
    }, [itemToUpdate, formType]);

    const formSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (isValidFileds()) {
            if (!itemToUpdate) {
                formType === "Task" ?
                    addTask({ ...taskInputs, ...sharedInputs }) :
                    addEvent({ ...eventInputs, ...sharedInputs });
                handleCloseDialog();
            }
            else {
                formType === "Task" ?
                    updateTask({ ...taskInputs, ...sharedInputs }) :
                    updateEvent({ ...eventInputs, ...sharedInputs });
                handleCloseDialog();
            }
        }
    }

    const isValidFileds = (): boolean => {
        let isValid = false;
        if (
            validator.trim(sharedInputs.id) === "" ||
            validator.trim(sharedInputs.title) === "" ||
            validator.trim(sharedInputs.description) === "" ||
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
        return <div>
            <div>
                <Autocomplete
                    freeSolo
                    id="status"
                    defaultValue={taskInputs.status}
                    disableClearable
                    options={statusesOptions.map((option: IStatus) => option)}
                    onChange={(event: React.FormEvent) => {
                        let newStatus: IStatus = (event.target as HTMLInputElement).textContent as IStatus;
                        newStatus = !statusesOptions.includes(newStatus) ? "Open" : newStatus;
                        setTaskInputs({ ...taskInputs, status: newStatus, review: newStatus !== "Done" ? "" : taskInputs.review })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Status"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </div>
            <div>
                <TextField id="estimatedTime" label="Estimated Time" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, estimatedTime: event.target.value })} defaultValue={taskInputs.estimatedTime} />
            </div>
            <div>
                <Autocomplete
                    freeSolo
                    id="priority"
                    defaultValue={taskInputs.priority}
                    disableClearable
                    options={priorityOptions.map((option: IPriority) => option)}
                    onChange={(event: React.FormEvent) => {
                        let newPriority: IPriority = (event.target as HTMLInputElement).textContent as IPriority;
                        newPriority = !priorityOptions.includes(newPriority) ? "Low" : newPriority;
                        setTaskInputs({ ...taskInputs, priority: newPriority, untilDate: newPriority !== "Top" ? "" : taskInputs.untilDate })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Priority"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </div>
            {
                taskInputs.priority === "Top" &&
                <div>
                    <TextField
                        id="untilDate"
                        label="Until Date"
                        type="datetime-local"
                        defaultValue={taskInputs.untilDate}
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={taskInputs.untilDate?.replace(" ", "T")}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            setTaskInputs({ ...taskInputs, untilDate: event.target.value.replace("T", " ") });
                        }}
                    />
                </div>
            }
            {
                taskInputs.status === "Done" &&
                <>
                    <div>
                        Review:
                        <TextareaAutosize
                            id="review"
                            placeholder="Enter review..."
                            defaultValue={taskInputs.review}
                            onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, review: (event.target as HTMLInputElement).value })}
                            style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                            required />
                    </div>
                    <div>
                        <TextField id="timeSpent" label="Time spent" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskInputs({ ...taskInputs, timeSpent: event.target.value })} defaultValue={taskInputs.timeSpent} />
                    </div>
                </>
            }
        </div>;
    }

    const renderEventDetails = (): JSX.Element => {
        return <div>
            <div>
                <ColorPicker value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })} />
            </div>

            <div>
                <TextField
                    id="beginningTime"
                    label="Beginning Time"
                    type="datetime-local"
                    defaultValue={eventInputs.beginningTime}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={eventInputs.beginningTime.replace(" ", "T")}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setEventInputs({ ...eventInputs, beginningTime: event.target.value.replace("T", " ") });
                    }}
                />
            </div>

            <div>
                <TextField
                    id="endingTime"
                    label="Ending Time"
                    type="datetime-local"
                    defaultValue={eventInputs.endingTime}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={eventInputs.endingTime.replace(" ", "T")}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setEventInputs({ ...eventInputs, endingTime: event.target.value.replace("T", " ") });
                    }}
                />
            </div>
            <div>
                <TextField
                    id="endingTime"
                    label="Notification Time"
                    type="datetime-local"
                    defaultValue={eventInputs.notificationTime}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={eventInputs.notificationTime?.replace(" ", "T")}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setEventInputs({ ...eventInputs, notificationTime: event.target.value.replace("T", " ") });
                    }}
                />
            </div>
            <div>
                <TextField id="location" label="Location" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} defaultValue={eventInputs.location} />
            </div>
            <div>
                Invited Guests:
                <InvitedGuestsFiled invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
            </div>
        </div>
    }

    const renderSharedDetails = (): JSX.Element => {
        return <div>
            <div>
                <TextField id="id" label="ID" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSharedInputs({ ...sharedInputs, id: event.target.value })} defaultValue={sharedInputs.id} disabled={disabled} required />
            </div>
            <div>
                <TextField id="title" label="Title" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSharedInputs({ ...sharedInputs, title: event.target.value })} defaultValue={sharedInputs.title} required />
            </div>
            <div>Description * : <br />
                <TextareaAutosize
                    id="description"
                    placeholder="Enter desc..."
                    defaultValue={sharedInputs.description}
                    onChange={(event: React.FormEvent) => setSharedInputs({ ...sharedInputs, description: (event.target as HTMLInputElement).value })}
                    style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                    required />
            </div>
        </div>
    }

    const renderDialogActions = (): JSX.Element => {
        return <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined" >
                Cancel
            </Button>
            <Button color="primary" type="submit" variant="contained">
                {buttonText}
            </Button>
        </DialogActions>
    }


    return (
        <Dialog
            open={true}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
            id="taskOrEventForm"
            style={{
                alignItems: "center"
            }}
            classes={{ paper: classes.dialog }}>
            <DialogTitle id="form-dialog-title">{buttonText + " " + formType} </DialogTitle>
            <form onSubmit={formSubmit} noValidate autoComplete="off">
                <DialogContent>
                    <DialogContentText> Details: </DialogContentText>
                    <div className="textFieldContainer">
                        {
                            enableSwitchType &&
                            <div>
                                <span id="chooseTypeTitle">Choose Type:</span>
                                <Select
                                    labelId="type"
                                    id="type"
                                    value={formType}
                                    label="Type"
                                    onChange={(event: SelectChangeEvent<string>) =>
                                        setFormType(event.target.value as ItemFormType)
                                    }>
                                    {
                                        itemFormTypeOptions.map((typeOption) =>
                                            <MenuItem value={typeOption}>{typeOption}</MenuItem>
                                        )
                                    }
                                </Select>
                            </div>
                        }
                        {renderSharedDetails()}
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

export default ItemUpdateAndCreateForm;



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
import { Actions, IPriority, IStatus, ITask, TodoContextType } from '../../types/tasksTypes';
import { priorityOptions, statusesOptions } from '../../constants/constants';
import { TodoContext } from '../../context/tasksContext';
import { EventsContextType, IEvent } from '../../types/eventsTypes';
import { Color, ColorPicker, createColor } from 'material-ui-color';
import { EventsContext } from '../../context/eventsContext';
import './DialogForm.css';

type DialogType = "Task" | "Event";

const optionsDialogType: DialogType[] = ["Task", "Event"];

interface DialogFormProps {
    action: Actions.Create | Actions.UPDATE;
    itm?: ITask | IEvent;
    handleCloseDialog(): void;
    type: DialogType;
    choose?: boolean;
}

const useStyles = makeStyles(() => ({
    dialog: {
        height: 600,
        width: 350
    }
}));

const DialogForm = ({ action, itm, handleCloseDialog, type, choose }: DialogFormProps) => {
    const classes = useStyles();
    const { addToDo, updateTodo, getTask } = useContext(TodoContext) as TodoContextType;
    const { addEvent, updateEvent, getEvent } = useContext(EventsContext) as EventsContextType;


    let [sharedInputs, setSharedInputs] = useState({
        title: "",
        id: "",
        description: "",
    })
    let [taskInputs, setTaskInputs] = useState<{
        estimatedTime: string,
        status: string,
        priority: IPriority,
        review?: string,
        timeSpent?: string,
        untilDate?: string
    }>({
        status: "Open",
        estimatedTime: "",
        priority: "Low",
        review: " ",
        timeSpent: "",
        untilDate: "",
    });
    let [eventInputs, setEventInputs] = useState<{
        beginningTime: string;
        endingTime: string;
        color: Color;
        location: string;
        notificationTime?: string;
    }>({
        beginningTime: "",
        endingTime: "",
        color: createColor("red"),
        location: "",
        notificationTime: ""
    })
    let [dialogTitle, setDialogTitle] = useState("");
    let [buttonText, setButtonText] = useState("");
    let [typeDialog, setTypeDialog] = useState<DialogType>(type);

    let [disabled, setDisabled] = useState(false);

    useEffect(() => {
        console.log("update")
        if (action === Actions.Create) {
            setButtonText("Create");
        }
        if (action === Actions.UPDATE && itm) {
            setButtonText("Update");
            let item: ITask | IEvent | null = typeDialog === "Task" ? getTask(itm.id) : getEvent(itm.id);
            setDisabled(true);
            if (item) {
                setSharedInputs({ ...sharedInputs, id: item.id, title: item.title, description: item.description });
                ("priority" in item) ?
                    setTaskInputs({ ...taskInputs, status: item.status, estimatedTime: item.estimatedTime, priority: item.priority, timeSpent: item.timeSpent, untilDate: item.untilDate, review: item.review })
                    :
                    setEventInputs({ ...eventInputs, color: item.color, beginningTime: item.beginningTime, endingTime: item.endingTime, location: item.location, notificationTime: item.notificationTime })
            }
        }
    }, [action, itm]);


    const formSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (
            validator.trim(sharedInputs.id) === "" ||
            validator.trim(sharedInputs.title) === "" ||
            validator.trim(sharedInputs.description) === "" ||
            validator.trim(taskInputs.status) === ""
        ) {
            alert("Please fill the Required Fields");
        }
        if (action === Actions.Create) {
            typeDialog === "Task" ?
                addToDo({ ...taskInputs, ...sharedInputs }) :
                addEvent({ ...eventInputs, ...sharedInputs });
        }
        if (action === Actions.UPDATE && itm) {
            typeDialog === "Task" ?
                updateTodo({ ...taskInputs, ...sharedInputs }) :
                updateEvent({ ...eventInputs, ...sharedInputs });
        }
        handleCloseDialog();
    }

    const renderTaskDetails = () => {
        return <div>
            <div>
                <Autocomplete
                    freeSolo
                    id="status"
                    defaultValue={taskInputs.status}
                    disableClearable
                    options={statusesOptions.map((option: IStatus) => option)}
                    onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, status: (event.target as HTMLInputElement).textContent as IStatus })}

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
                    onChange={(event: React.FormEvent) => setTaskInputs({ ...taskInputs, priority: (event.target as HTMLInputElement).textContent as IPriority })}
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

    const renderEventDetails = () => {
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
        </div>
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
            classes={{ paper: classes.dialog }}

        >
            <DialogTitle id="form-dialog-title">{buttonText + " " + typeDialog} </DialogTitle>
            <form onSubmit={formSubmit} noValidate autoComplete="off">
                <DialogContent>
                    <DialogContentText> Details: </DialogContentText>


                    <div className="textFieldContainer">
                        {
                            choose &&
                            <div>
                                <span id="chooseTypeTitle">Choose Type:</span>
                                <Select
                                    labelId="typeD"
                                    id="typeD"
                                    value={typeDialog}
                                    label="Type"
                                    onChange={(event: SelectChangeEvent<string>) =>
                                        setTypeDialog(event.target.value as DialogType)
                                    }
                                >
                                    {
                                        optionsDialogType.map((typeOption) =>
                                            <MenuItem value={typeOption}>{typeOption}</MenuItem>

                                        )
                                    }
                                </Select>
                            </div>
                        }
                        <div>
                            <TextField id="id" label="ID" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSharedInputs({ ...sharedInputs, id: event.target.value })} defaultValue={sharedInputs.id} disabled={disabled} required />
                        </div>
                        <div>
                            <TextField id="title" label="Title" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSharedInputs({ ...sharedInputs, title: event.target.value })} defaultValue={sharedInputs.title} required />
                        </div>

                        <div>Description: <br />
                            <TextareaAutosize
                                id="description"
                                placeholder="Enter desc..."
                                defaultValue={sharedInputs.description}
                                onChange={(event: React.FormEvent) => setSharedInputs({ ...sharedInputs, description: (event.target as HTMLInputElement).value })}
                                style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                                required />
                        </div>
                        {
                            typeDialog === "Task" ?
                                renderTaskDetails()
                                : renderEventDetails()
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary" variant="outlined" >
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" variant="contained">
                        {buttonText}
                    </Button>
                </DialogActions>
            </form>

        </Dialog >
    );
};

export default DialogForm;
import React, { useContext, useEffect, useState } from 'react';
import { Actions } from '../../../types/tasksTypes';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import validator from "validator";
import makeStyles from '@mui/styles/makeStyles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { EventsContext } from '../../../context/eventsContext';
import { EventsContextType, IEvent } from '../../../types/eventsTypes';
import { Color, ColorPicker, ColorValue, createColor } from "material-ui-color";
import './EventForm.css';

interface EventFormProps {
    action: Actions.Create | Actions.UPDATE;
    idToUpdate?: string;
    handleCloseEventDialog(): void;
}

const useStyles = makeStyles(() => ({
    dialog: {
        height: 600,
        width: 350
    },
    colorInput: {
        color: "aliceblue !important"
    }
}));

const EventForm = ({ action, idToUpdate, handleCloseEventDialog }: EventFormProps) => {
    const classes = useStyles();
    const { addEvent, updateEvent, getEvent } = useContext(EventsContext) as EventsContextType;

    let [eventInputs, setEventInputs] = useState<IEvent>({
        title: "",
        id: "",
        description: "",
        beginningTime: "",
        endingTime: "",
        color: createColor("red"),
        location: "",
        notificationTime: ""
    })

    let [dialogTitle, setDialogTitle] = useState("");
    let [buttonText, setButtonText] = useState("");
    let [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (action === Actions.Create) {
            setDialogTitle("Create Event");
            setButtonText("Create");
        }
        if (action === Actions.UPDATE && idToUpdate) {
            setButtonText("Update");
            let event: IEvent | null = getEvent(idToUpdate);
            setDialogTitle("Update Event");
            setDisabled(true);
            if (event) {
                setEventInputs({ ...eventInputs, id: event.id, title: event.title, description: event.description, color: event.color, beginningTime: event.beginningTime.replace(" ", "T"), endingTime: event.endingTime.replace(" ", "T"), location: event.location, notificationTime: event.notificationTime })
            }
        }
    }, []);


    const eventFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (
            validator.trim(eventInputs.id) === "" ||
            validator.trim(eventInputs.title) === "" ||
            validator.trim(eventInputs.description) === ""
        ) {
            alert("Please fill the Required Fields");
        }

        setEventInputs({ ...eventInputs, beginningTime: eventInputs.beginningTime.replace("T", " ") })
        setEventInputs({ ...eventInputs, endingTime: eventInputs.endingTime.replace("T", " ") })
        if (action === Actions.Create) {

            addEvent(eventInputs);
        }
        if (action === Actions.UPDATE && idToUpdate) {
            updateEvent(eventInputs);
        }
        handleCloseEventDialog();

    }


    return (
        <Dialog
            open={true}
            onClose={handleCloseEventDialog}
            aria-labelledby="form-dialog-title"
            id="eventForm"
            style={{
                alignItems: "center"
            }}
            classes={{ paper: classes.dialog }}

        >
            <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <form onSubmit={eventFormSubmit} noValidate autoComplete="off">
                <DialogContent>
                    <DialogContentText> Event Details: </DialogContentText>

                    <div className="textFieldContainer">
                        <div>
                            <TextField id="id" label="Event ID" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, id: event.target.value })} defaultValue={eventInputs.id} disabled={disabled} required />
                        </div>
                        <div>
                            <TextField id="title" label="Title" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, title: event.target.value })} defaultValue={eventInputs.title} required />
                        </div>

                        <div>
                            <ColorPicker value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })} />
                        </div>

                        <div>Description: <br />
                            <TextareaAutosize
                                id="description"
                                placeholder="Enter desc..."
                                defaultValue={eventInputs.description}
                                onChange={(event: React.FormEvent) => setEventInputs({ ...eventInputs, description: (event.target as HTMLInputElement).value })}
                                style={{ width: 250, height: 100, marginTop: 10, overflow: 'auto', backgroundColor: 'inherit', color: "white" }}
                                required />
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
                                value={eventInputs.beginningTime}

                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setEventInputs({ ...eventInputs, beginningTime: event.target.value });
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
                                value={eventInputs.endingTime}

                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                    setEventInputs({ ...eventInputs, endingTime: event.target.value });
                                }}
                            />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEventDialog} color="secondary" variant="outlined" >
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" variant="contained">
                        {buttonText}
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
};

export default EventForm;
import { TextField } from "@mui/material";
import { Color, ColorPicker } from "material-ui-color";
import { Event } from "../../classes/Event";
import InvitedGuestsField from "./InvitedGuestsField";
import { getDateTextField } from "./utils";
import { makeStyles } from "@mui/styles";

interface EventFormProps {
    eventInputs: Omit<Event, "id" | "title" | "description">;
    setEventInputs(newTaskInputs: Omit<Event, "id" | "title" | "description">): void;
    classField: string;
}

const useStyles = makeStyles({
    colorPicker: {
        display: "flex",
        marginBottom: "5%"
    },
    colorPickerTitle: {
        marginTop: "2%",
        marginRight: "3%"
    }
});

function EventForm({ eventInputs, setEventInputs, classField }: EventFormProps) {
    const classes = useStyles();

    return <>
        {getDateTextField(classField, "Beginning Date", "beginningTime", eventInputs, setEventInputs)}
        {getDateTextField(classField, "Ending Time", "endingTime", eventInputs, setEventInputs)}
        {getDateTextField(classField, "Notification Time", "notificationTime", eventInputs, setEventInputs)}
        <TextField className={classField} label="Location" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} defaultValue={eventInputs.location} />
        <div className={classes.colorPicker}>
            <div className={classes.colorPickerTitle}>Color:</div> <ColorPicker hideTextfield value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })} />
        </div>
        <div>Invited Guests: </div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
    </>;
};

export default EventForm;
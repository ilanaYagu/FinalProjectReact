import { TextField } from "@mui/material";
import { Color, ColorPicker } from "material-ui-color";
import InvitedGuestsField from "./InvitedGuestsField";
import { makeStyles } from "@mui/styles";
import { EventInputs } from "./ItemForm";
import DateTextField from "./DateTextField";

interface EventFormProps {
    eventInputs: EventInputs;
    setEventInputs(newEventInputs: EventInputs): void;
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
        <DateTextField label="Beginning Date" field="beginningTime" inputs={eventInputs} setInputs={setEventInputs} />
        <DateTextField label="Ending Time" field="endingTime" inputs={eventInputs} setInputs={setEventInputs} />
        <DateTextField label="Notification Time" field="notificationTime" inputs={eventInputs} setInputs={setEventInputs} />
        <TextField margin="normal" className={classField} label="Location" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} defaultValue={eventInputs.location} />
        <div className={classes.colorPicker}>
            <div className={classes.colorPickerTitle}>Color:</div> <ColorPicker hideTextfield value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })} />
        </div>
        <div>Invited Guests: </div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
    </>;
};

export default EventForm;
import { TextField } from "@mui/material";
import { Color, ColorPicker } from "material-ui-color";
import { Event } from "../../classes/Event";
import InvitedGuestsField from "./InvitedGuestsField";

interface EventFormProps {
    eventInputs: Omit<Event, "id" | "title" | "description">;
    setEventInputs(newTaskInputs: Omit<Event, "id" | "title" | "description">): void;
    classField: string;
}

function EventForm({ eventInputs, setEventInputs, classField }: EventFormProps) {
    const getDateTextField = (label: string, field: keyof Omit<Event, "id" | "title" | "description">) => {
        return <TextField className={classField} label={label} type="datetime-local" defaultValue={eventInputs[field]}
            InputLabelProps={{ shrink: true }} value={(eventInputs[field] as string).replace(" ", "T")}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setEventInputs({
                    ...eventInputs, [field]: event.target.value.replace("T", " ")
                });
            }} />
    }

    return <>
        <ColorPicker value={eventInputs.color} onChange={(newColor: Color) => setEventInputs({ ...eventInputs, color: newColor })
        } />
        {getDateTextField("Beginning Date", "beginningTime")}
        {getDateTextField("Ending Time", "endingTime")}
        {getDateTextField("Notification Time", "notificationTime")}
        < TextField className={classField} label="Location" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEventInputs({ ...eventInputs, location: event.target.value })} defaultValue={eventInputs.location} />
        <div>Invited Guests: </div> <InvitedGuestsField invitedGuests={eventInputs.invitedGuests} setInvitedGuests={(newInvitedGuests: string[]) => setEventInputs({ ...eventInputs, invitedGuests: newInvitedGuests })} />
    </>;
};

export default EventForm;
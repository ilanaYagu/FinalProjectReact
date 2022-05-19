import { useState } from "react";
import { TextField, Chip } from "@mui/material";

interface InvitedGuestsFieldProps {
    invitedGuests?: string[];
    setInvitedGuests(newInvitedGuests: string[]): void;
}

const InvitedGuestsField = ({ invitedGuests, setInvitedGuests }: InvitedGuestsFieldProps) => {
    const [newGuest, setnewGuest] = useState<string>("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (["Enter", "Tab", ","].includes(event.key)) {
            const value = newGuest.trim();
            if (value) {
                invitedGuests ?
                    setInvitedGuests([...invitedGuests, newGuest])
                    :
                    setInvitedGuests([newGuest])
                setnewGuest("");
            }
        }
    };

    return (
        <div>
            {invitedGuests?.map((name: string) => (
                <Chip label={name} variant="outlined"
                    onDelete={() =>
                        setInvitedGuests(invitedGuests.filter((chip) => chip !== name))
                    }
                />
            ))}
            <TextField placeholder="new guest" variant="standard" value={newGuest} onKeyDown={handleKeyDown}
                onChange={(event) => setnewGuest(event.target.value)} />
        </div>
    );
}

export default InvitedGuestsField;

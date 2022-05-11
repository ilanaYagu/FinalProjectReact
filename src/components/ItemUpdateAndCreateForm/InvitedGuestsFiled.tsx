import { useState } from "react";
import { TextField, Chip } from "@mui/material";

interface InvitedGuestsFiledProps {
    invitedGuests?: string[];
    setInvitedGuests(newInvitedGuests: string[]): void;
}

const InvitedGuestsFiled = ({ invitedGuests, setInvitedGuests }: InvitedGuestsFiledProps) => {
    const [newGuest, setnewGuest] = useState<string>("");

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();
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
                <Chip
                    key={name}
                    label={name} variant="outlined"
                    onDelete={() =>
                        setInvitedGuests(invitedGuests.filter((chip) => chip !== name))
                    }
                />
            ))}
            <TextField
                id="input-chips-email"
                placeholder="new guest"
                variant="standard"
                value={newGuest}
                onKeyDown={handleKeyDown}
                onChange={(evt) => setnewGuest(evt.target.value)}
            />
        </div>

    );
}

export default InvitedGuestsFiled;

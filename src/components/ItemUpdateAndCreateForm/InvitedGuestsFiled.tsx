import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Chip from '@mui/material/Chip';
import { TextField } from "@mui/material";

interface InvitedGuestsFiledProps {
    invitedGuests?: string[];
    setInvitedGuests(newInvitedGuests: string[]): void;
}

export default function InvitedGuestsFiled({ invitedGuests, setInvitedGuests }: InvitedGuestsFiledProps): ReactElement {
    const [newGuest, setnewGuest] = useState<string>("");

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {

        if (["Enter", "Tab", ","].includes(evt.key)) {
            evt.preventDefault();

            const value = newGuest.trim();

            if (value) {
                invitedGuests ?
                    setInvitedGuests(
                        [...invitedGuests, newGuest]
                    )
                    : setInvitedGuests(
                        [newGuest]
                    )

                setnewGuest("");
            }
        }
    };


    return (
        <div className="container">

            <div className="emails">
                {invitedGuests?.map((name: string) => (
                    <Chip
                        key={name}
                        label={name} variant="outlined" onDelete={() =>
                            setInvitedGuests(
                                invitedGuests.filter((chip) => chip !== name)
                            )
                        }
                        className="spacing"
                    />
                ))}
                <TextField
                    id="input-chips-email"
                    placeholder="new guest"
                    className="email"
                    variant="standard"
                    value={newGuest}
                    onKeyDown={handleKeyDown}
                    onChange={(evt) => setnewGuest(evt.target.value)}
                />
            </div>
        </div>
    );
}

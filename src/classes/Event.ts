import { Color, ColorValue } from "mui-color";
import { Basic } from "./Basic";

export class Event extends Basic {
    beginningTime: string;
    endingTime: string;
    color: Color;
    location: string;
    notificationTime: string;
    invitedGuests: string[];

    constructor(id: string, title: string, description: string, beginningTime: string, endingTime: string, color: Color, location: string, notificationTime: string, invitedGuests: string[]) {
        super(id, title, description);
        this.beginningTime = beginningTime || "";
        this.endingTime = endingTime || "Open";
        this.color = color || "red";
        this.location = location || "";
        this.notificationTime = notificationTime || "";
        this.invitedGuests = invitedGuests || [];
    }

}
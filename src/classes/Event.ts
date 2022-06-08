import { Color } from "mui-color";
import { BasicItem } from "./BasicItem";

export class Event extends BasicItem {
    beginningTime: string;
    endingTime: string;
    color: string;
    location: string;
    notificationTime: string;
    invitedGuests: string[];

    constructor(event: Event) {
        super(event._id, event.title, event.description);
        this.beginningTime = event.beginningTime || "";
        this.endingTime = event.endingTime || "Open";
        this.color = event.color || "red";
        this.location = event.location || "";
        this.notificationTime = event.notificationTime || "";
        this.invitedGuests = event.invitedGuests || [];
    }

}
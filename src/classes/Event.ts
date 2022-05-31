import { Color } from "mui-color";
import { BasicItem } from "./BasicItem";

export class Event extends BasicItem {
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
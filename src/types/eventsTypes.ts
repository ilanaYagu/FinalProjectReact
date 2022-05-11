import { Color } from "mui-color";
import { IBasicType } from "./generalTypes";

export interface IEvent extends IBasicType {
    beginningTime: string;
    endingTime: string;
    color: Color;
    location: string;
    notificationTime?: string;
    invitedGuests?: string[];
}

export type EventsContextType = {
    events: IEvent[];
    addEvent: (todo: IEvent) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (todo: IEvent) => void;
    getEvent: (id: string) => IEvent | null;
};


export type IBeginningTimeEventFilterOption = 'Events For Today' | 'Future Events' | "";


export interface IBeginningTimeEventFilter {
    selectedBeginningTimeEvent: IBeginningTimeEventFilterOption
}



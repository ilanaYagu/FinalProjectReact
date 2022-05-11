import { Color } from "mui-color";
import { BasicType } from "./generalTypes";

export interface IEvent extends BasicType {
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


export type BeginningTimeEventFilterOption = 'Events For Today' | 'Future Events' | "";


export interface IBeginningTimeEventFilter {
    selectedBeginningTimeEvent: BeginningTimeEventFilterOption
}

export const BeginningTimeEventOptions: BeginningTimeEventFilterOption[] = ['Events For Today', 'Future Events']


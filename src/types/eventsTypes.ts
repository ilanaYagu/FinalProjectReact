import { Event } from "../classes/Event";

export type EventsContextType = {
    events: Event[];
    addEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (eventToUpdate: Event) => void;
    getEvent: (id: string) => Event | undefined;
};

export type BeginningTimeEventFilterOption = 'Events For Today' | 'Future Events' | "";

export interface BeginningTimeEventFilter {
    selectedBeginningTimeEvent: BeginningTimeEventFilterOption
}



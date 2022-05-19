import { Event } from "../classes/Event";

export type EventsContextType = {
    events: Event[];
    addEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (eventToUpdate: Event) => void;
    getEvent: (id: string) => Event | undefined;
};





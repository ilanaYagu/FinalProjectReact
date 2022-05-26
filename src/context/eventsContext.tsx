import { useState, createContext, PropsWithChildren } from 'react';
import { createColor } from 'mui-color';
import { Event } from '../classes/Event';

export type EventsContextType = {
    events: Event[];
    addEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (eventToUpdate: Event) => void;
    getEvent: (id: string) => Event | undefined;
};

export const EventsContext = createContext<EventsContextType>({
    events: [],
    addEvent: () => { },
    deleteEvent: () => { },
    updateEvent: () => { },
    getEvent: () => undefined
});

const EventsProvider = ({ children }: PropsWithChildren<{}>) => {
    let [events, setEvents] = useState<Event[]>([
        new Event("1", 'Vet - for my dogo', 'The doctor ask me to call him one day before the appointment.', '2022-05-12 12:23', '2022-07-09 13:23', createColor("#C88383"),
            "Ashkelon, the clinic of Yosof",
            "",
            ["Michal Grinborg", "Ron C.", "Ilanit"]
        ),
        new Event("2", 'Wedding to my bff!', 'Need to buy a dress, and a gift of course.', '2025-09-12 19:30', '2025-09-13 05:45', createColor("#7EA87E"),
            "Paris",
            "",
            ["Shai", "Ronit", "Hen Levis", "Sholamit"]
        ),
        new Event("232", 'Meeting with the hamus organization', 'with the highest there, like abu masen', '2025-07-20 17:30', '2025-07-20 18:45', createColor("#94B1A6"),
            "Egypt",
            "",
            ["Ilanit Levi", "Galit Gutman", "Yunit"]
        )
    ]);

    const addEvent = (newEvent: Event): void => {
        const event = new Event(newEvent.id, newEvent.title, newEvent.description,
            newEvent.beginningTime, newEvent.endingTime, newEvent.color, newEvent.location, newEvent.notificationTime, newEvent.invitedGuests);
        setEvents([...events, event]);
    };

    const updateEvent = (eventToUpdate: Event): void => {
        const tempEvents = events.map((event) => {
            if (event.id === eventToUpdate.id) {
                return new Event(eventToUpdate.id, eventToUpdate.title, eventToUpdate.description,
                    eventToUpdate.beginningTime, eventToUpdate.endingTime, eventToUpdate.color, eventToUpdate.location, eventToUpdate.notificationTime, eventToUpdate.invitedGuests);
            }
            return event;
        });
        setEvents(tempEvents);
    };

    const deleteEvent = (id: string): void => {
        const newEventsArr: Event[] = events.filter((event) => {
            return event.id !== id
        });
        setEvents(newEventsArr);
    }

    const getEvent = (id: string): Event | undefined => {
        return events.find((event) => id === event.id);
    }

    return <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEvent }}>{children}</EventsContext.Provider>;
};


export default EventsProvider;
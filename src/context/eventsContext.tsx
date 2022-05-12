import { createColor } from 'mui-color';
import * as React from 'react';
import { EventsContextType, IEvent } from '../types/eventsTypes';

export const EventsContext = React.createContext<EventsContextType | null>(null);

const EventsProvider: React.FC<React.ReactNode> = ({ children }) => {
    let [events, setEvents] = React.useState<IEvent[]>([
        {
            id: "1",
            title: 'Vet - for my dogo',
            description: 'The doctor ask me to call him one day before the appointment.',
            beginningTime: '2022-05-12 12:23',
            endingTime: '2022-07-09 13:23',
            color: createColor("#C88383"),
            location: "Ashkelon, the clinic of Yosof",
            invitedGuests: ["Michal Grinborg", "Ron C.", "Ilanit"]
        },
        {
            id: "2",
            title: 'Wedding to my bff!',
            description: 'Need to buy a dress, and a gift of course.',
            beginningTime: '2025-09-12 19:30',
            endingTime: '2025-09-13 05:45',
            color: createColor("#7EA87E"),
            location: "Paris",
            invitedGuests: ["Shai", "Ronit", "Hen Levis", "Sholamit"]
        },
        {
            id: "232",
            title: 'Meeting with the hamus organization',
            description: 'with the highest there, like abu masen',
            beginningTime: '2025-07-20 17:30',
            endingTime: '2025-07-20 18:45',
            color: createColor("#94B1A6"),
            location: "Egypt",
            invitedGuests: ["Ilanit Levi", "Galit Gutman", "Yunit"]
        }
    ]);
    const addEvent = (newEvent: IEvent) => {
        setEvents([...events, newEvent]);
    };
    const updateEvent = (event: IEvent) => {
        let i: number;
        const temp = [...events];

        for (i = 0; i < temp.length; i++) {
            if (temp[i].id === event.id) {
                temp[i] = event;
                console.log(temp[i])
            }
        }
        setEvents(temp);
    };

    const deleteEvent = (id: string) => {

        const newEventsArr: IEvent[] = events.filter((event, index) => {
            return event.id !== id
        });
        setEvents(newEventsArr);
    }

    const getEvent = (id: string): IEvent | null => {
        for (const event of events) {
            if (event.id === id) {
                return event;
            }
        }
        return null;
    }


    return <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEvent }}>{children}</EventsContext.Provider>;
};

export default EventsProvider;
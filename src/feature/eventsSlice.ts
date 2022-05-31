import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createColor } from "mui-color";
import { Event } from "../classes/Event";

interface EventsState {
    events: Event[];
}

const initialEventsState: EventsState = {
    events: [
        new Event("1", 'Vet - for my dogo', 'The doctor ask me to call him one day before the appointment.', '2022-05-29 12:23', '2022-07-09 13:23', createColor("#C88383"),
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
    ]
};

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
        addEvent: (state, action: PayloadAction<Event>): void => {
            const newEvent = action.payload;
            state.events.push(new Event(newEvent.id, newEvent.title, newEvent.description,
                newEvent.beginningTime, newEvent.endingTime, newEvent.color, newEvent.location, newEvent.notificationTime, newEvent.invitedGuests));
        },
        updateEvent: (state, action: PayloadAction<Event>): void => {
            const eventToUpdate = action.payload;
            state.events = state.events.map((event) => {
                if (event.id === eventToUpdate.id) {
                    return new Event(eventToUpdate.id, eventToUpdate.title, eventToUpdate.description,
                        eventToUpdate.beginningTime, eventToUpdate.endingTime, eventToUpdate.color, eventToUpdate.location, eventToUpdate.notificationTime, eventToUpdate.invitedGuests);
                }
                return event;
            });;
        },
        deleteEvent: (state, action: PayloadAction<string>): void => {
            state.events = state.events.filter((event) => {
                return event.id !== action.payload;
            });;
        }
    }
})


export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
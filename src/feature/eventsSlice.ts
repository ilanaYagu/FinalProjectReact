import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpStatusType, API_URL } from "../app/store-constants";
import { Event } from "../classes/Event";

interface EventsState {
    events: Event[];
    status: HttpStatusType;
    error?: string;
}

const initialEventsState: EventsState = {
    events: [],
    status: HttpStatusType.PENDING
};

const EVENTS_API_URL = `${API_URL}events/`;

export const fetchEvents = createAsyncThunk<{ error: boolean; events: Event[]; }>('events/fetchEvents',
    async () => {
        const response = await fetch(`${EVENTS_API_URL}all`,
            {
                method: 'GET',

            });
        return response.json();
    })

export const addEvent = createAsyncThunk<{ error: boolean; event: Event; }, Event>('events/addEvent',
    async (newEvent: Event) => {
        const response = await fetch(`${EVENTS_API_URL}add`,
            {
                method: 'POST',
                body: JSON.stringify({ event: newEvent })

            });
        return response.json();
    })

export const updateEvent = createAsyncThunk<{ error: boolean; event: Event; }, Event>('events/updateEvent',
    async (event: Event) => {
        const response = await fetch(`${EVENTS_API_URL}update`,
            {
                method: 'POST',
                body: JSON.stringify({ event })

            });
        return response.json();
    })

export const deleteEvent = createAsyncThunk<{ error: boolean; _id: string; }, string>('events/deleteEvent',
    async (_id: string) => {
        const response = await fetch(`${EVENTS_API_URL}delete`,
            {
                method: 'POST',
                body: JSON.stringify({ _id })

            });
        return response.json();
    })

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventsState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEvents.pending, (state, action) => {
                state.status = HttpStatusType.PENDING;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                action.payload.events.forEach((eventFromResponse) => {
                    state.events.push(new Event(eventFromResponse));
                })
                state.status = HttpStatusType.FULFILLED;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.events.push(new Event(action.payload.event))
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter((event) => {
                    return event._id !== action.payload._id;
                });;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                const eventToUpdate = action.payload.event;
                state.events = state.events.map((event) => {
                    if (event._id === eventToUpdate._id) {
                        return new Event(eventToUpdate);
                    }
                    return event;
                });;
            })
    }
})

export default eventsSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../feature/tasksSlice";
import eventsReducer from "../feature/eventsSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        events: eventsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
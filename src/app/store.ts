import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../feature/tasksSlice";
import eventsReducer from "../feature/eventsSlice";
import deleteItemFormReducer from "../feature/deleteItemFormSlice";
import itemFormReducer from "../feature/itemFormSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        events: eventsReducer,
        deleteItemForm: deleteItemFormReducer,
        itemForm: itemFormReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
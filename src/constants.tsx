import { TableHeaders } from "./types/managementTableTypes";
import { Task } from "./classes/Task";
import { Event } from "./classes/Event";

export const columnsForTasksTable: TableHeaders<Task> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    status: "Status",
    estimatedTime: "Estimated Time",
    other: "Other",
    actions: "Actions"
};

export const columnsForTodayTasksAndEventsTable: TableHeaders<Task> | TableHeaders<Event> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    other: "Other",
    actions: "Actions"
};

export const columnsForEventsTable: TableHeaders<Event> = {
    color: "Color",
    title: "Title",
    beginningTime: "From",
    endingTime: "Until",
    location: "Location",
    actions: "Actions"
};






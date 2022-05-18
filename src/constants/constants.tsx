import { Priority, Status } from "../types/tasksTypes";
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { green, pink } from "@mui/material/colors";
import { BeginningTimeEventFilterOption } from "../types/eventsTypes";
import { otherColumnProperties, TableHeaders } from "../types/generalTypes";
import { Task } from "../classes/Task";
import { Event } from "../classes/Event";
import { Basic } from "../classes/Basic";


export const columnsForTasksTable: TableHeaders<Task> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    status: "Status",
    estimatedTime: "Estimated Time",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTasksTable: otherColumnProperties<Task> = {
    untilDate: "Until Date",
    timeSpent: "Time Spent"
};

export const columnsForTodayTasksAndEventsTable: TableHeaders<Task> | TableHeaders<Event> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTodayTasksAndEventsTable: otherColumnProperties<Task> | otherColumnProperties<Event> = {
    status: "Status",
    untilDate: "Until Date",
    beginningTime: "From",
    endingTime: "Until",
    estimatedTime: "Estimated Time",
    location: "Location"
};

export const columnsForEventsTable: TableHeaders<Event> = {
    color: "Color",
    title: "Title",
    beginningTime: "From",
    endingTime: "Until",
    location: "Location",
    actions: "Actions"
};

export const statusesOptions: Status[] = ['Open', 'In Progress', 'Done'];
export const priorityOptions: Priority[] = ['Low', 'Top', 'Regular'];

export const customRenderers = {
    type: (it: Basic) => (
        it instanceof Task ?
            it.priority === "Low" ?
                <AssignmentIcon />
                : it.priority === "Top" ?
                    <AssignmentLateIcon sx={{ color: pink[400] }} /> :
                    <AssignmentIcon sx={{ color: green[500] }} />
            :
            <NotificationsActiveIcon />
    ),
    priority: (it: Basic) => (
        it instanceof Task ?
            it.priority === "Low" ?
                <KeyboardDoubleArrowDownRoundedIcon sx={{ color: green[500] }} />
                : it.priority === "Top" ?
                    <KeyboardDoubleArrowUpRoundedIcon sx={{ color: pink[500] }} /> :
                    <ArrowDownwardRoundedIcon />
            :
            <HorizontalRuleIcon />
    )
}

export const customRenderersEvents = {
    color: (it: Basic) => (
        it instanceof Event &&
        <Brightness1RoundedIcon sx={{ color: "#" + it.color.hex }} />
    )
}

export enum Type {
    Task = 'Task',
    Event = 'Event',
}

export const BeginningTimeEventOptions: BeginningTimeEventFilterOption[] = ['Events For Today', 'Future Events']

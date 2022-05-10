import { IPriority, IStatus, ITask } from "../types/tasksTypes";
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { green, pink } from "@mui/material/colors";
import { IEvent } from "../types/eventsTypes";

export const columnsForTasksTable = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    status: "Status",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTasksTable = {
    untilDate: "Until Date",
    estimatedTime: "Estimated Date",
    timeSpent: "Time Spent"
};

export const columnsForTodayTasksAndEventsTable = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTodayTasksAndEventsTable = {
    untilDate: "Until Date",
    beginningTime: "Beginning Time",
    endingTime: "Ending Time",
    estimatedTime: "Estimated Time",
    location: "location"
};

export const columnsForEventsTable = {
    color: "Color",
    title: "Title",
    beginningTime: "From",
    endingTime: "Until",
    location: "Location",
    actions: "Actions"
};


export const showInOtherColumn = ['estimatedTime', 'timeSpent', 'untilDate', 'location', 'beginningTime', 'endingTime']
export const statusesOptions: IStatus[] = ['Open', 'In Progress', 'Done'];
export const priorityOptions: IPriority[] = ['Low', 'Top', 'Regular'];

export const customRenderers = {
    type: (it: ITask | IEvent) => (
        "priority" in it ?
            it.priority === "Low" ?
                <AssignmentIcon />
                : it.priority === "Top" ?
                    <AssignmentLateIcon sx={{ color: pink[400] }} /> :
                    <AssignmentIcon sx={{ color: green[500] }} />
            :
            <NotificationsActiveIcon />
    ),
    priority: (it: ITask | IEvent) => (
        "priority" in it ?
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
    color: (it: IEvent) => (
        <Brightness1RoundedIcon sx={{ color: "#" + it.color.hex }} />
    )
}
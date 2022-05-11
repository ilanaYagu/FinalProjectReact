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
import { IBeginningTimeEventFilterOption, IEvent } from "../types/eventsTypes";
import { otherColumnProperties, TableHeaders } from "../types/generalTypes";


export const columnsForTasksTable: TableHeaders<ITask> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    status: "Status",
    estimatedTime: "Estimated Time",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTasksTable: otherColumnProperties<ITask> = {
    untilDate: "Until Date",
    timeSpent: "Time Spent"
};

export const columnsForTodayTasksAndEventsTable: TableHeaders<ITask> | TableHeaders<IEvent> = {
    type: "Type",
    priority: "Priority",
    title: "Title",
    other: "Other",
    actions: "Actions"
};

export const otherColumnForTodayTasksAndEventsTable: otherColumnProperties<ITask> | otherColumnProperties<IEvent> = {
    status: "Status",
    untilDate: "Until Date",
    beginningTime: "From",
    endingTime: "Until",
    estimatedTime: "Estimated Time",
    location: "Location"
};

export const columnsForEventsTable: TableHeaders<IEvent> = {
    color: "Color",
    title: "Title",
    beginningTime: "From",
    endingTime: "Until",
    location: "Location",
    actions: "Actions"
};

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
    color: (it: IEvent | ITask) => (
        "color" in it &&
        <Brightness1RoundedIcon sx={{ color: "#" + it.color.hex }} />
    )
}

export const filterTodaysTasks = (tasks: ITask[]): ITask[] => {
    return tasks.filter((task) => {
        if (task.untilDate) {
            const today = new Date();
            const untilDate = new Date(task.untilDate);
            return untilDate.getDate() === today.getDate() &&
                untilDate.getMonth() === today.getMonth() &&
                untilDate.getFullYear() === today.getFullYear()
        }
        return false;
    });
}

export const filterTodaysEvents = (events: IEvent[]): IEvent[] => {
    return events.filter((event) => {
        if (event.beginningTime) {
            const today = new Date();
            const beginningTime = new Date(event.beginningTime);
            return beginningTime.getDate() === today.getDate() &&
                beginningTime.getMonth() === today.getMonth() &&
                beginningTime.getFullYear() === today.getFullYear()
        }
        return false;
    });
}

export const BeginningTimeEventOptions: IBeginningTimeEventFilterOption[] = ['Events For Today', 'Future Events']

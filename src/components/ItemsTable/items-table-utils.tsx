import { BasicItem } from "../../classes/BasicItem";
import { customSortProperties, SortField, SortOrderType } from "./ItemsTable";
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { green, pink } from "@mui/material/colors";
import { Task } from "../../classes/Task";
import { PriorityType } from "../../types/tasksTypes";
import { Event } from "../../classes/Event";

export type CustomSortProperties = {
    sortField: SortField;
    sort: (a: BasicItem, b: BasicItem, orderBy: SortField) => number;
}

export const getComparator = (order: SortOrderType, orderBy: SortField): ((a: BasicItem, b: BasicItem) => number) =>
    order === SortOrderType.Desc ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const sortByEstimatedTime = (a: BasicItem, b: BasicItem, orderBy: SortField): number => {
    const numA = parseInt(a[orderBy as keyof BasicItem]?.replace(/^\D+/g, ''));
    let dateA = new Date();
    dateA.setDate(new Date().getDate() + (a[orderBy as keyof BasicItem]?.includes("d") ? numA : numA * 7));

    const numB = parseInt(b[orderBy as keyof BasicItem]?.replace(/^\D+/g, ''));
    let dateB = new Date();
    dateB.setDate(new Date().getDate() + (b[orderBy as keyof BasicItem]?.includes("d") ? numB : numB * 7))
    return compare(dateA, dateB);
}

const descendingComparator = (a: BasicItem, b: BasicItem, orderBy: SortField): number => {
    if (customSortProperties.filter(property => property.sortField === orderBy).length > 0) {
        return doCustomSort(a, b, orderBy)
    }
    return compare(a[orderBy as keyof BasicItem], b[orderBy as keyof BasicItem])
}

const doCustomSort = (a: BasicItem, b: BasicItem, orderBy: SortField): number => {
    let comparationResult: number = 0;
    customSortProperties.forEach(property => {
        if (property.sortField === orderBy) {
            comparationResult = property.sort(a, b, orderBy);
        }
    });
    return comparationResult;
}

const compare = <T,>(a: T, b: T) => {
    if (b < a) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;
}

export const getTypeIcon = (item: BasicItem) =>
    item instanceof Task ?
        item.priority === PriorityType.Low ?
            <AssignmentIcon />
            : item.priority === PriorityType.Top ?
                <AssignmentLateIcon sx={{ color: pink[400] }} /> :
                <AssignmentIcon sx={{ color: green[500] }} />
        :
        <NotificationsActiveIcon />

export const getPriorityIcon = (item: BasicItem) =>
    item instanceof Task ?
        item.priority === PriorityType.Low ?
            <KeyboardDoubleArrowDownRoundedIcon sx={{ color: green[500] }} />
            : item.priority === PriorityType.Top ?
                <KeyboardDoubleArrowUpRoundedIcon sx={{ color: pink[500] }} /> :
                <ArrowDownwardRoundedIcon />
        :
        <HorizontalRuleIcon />

export const getColorIcon = (item: BasicItem) =>
    item instanceof Event ?
        <Brightness1RoundedIcon sx={{ color: "#" + item.color.hex }} /> : ""


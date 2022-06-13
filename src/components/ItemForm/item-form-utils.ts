import { PriorityType } from "../../types/tasksTypes";
import { EventInputs, TaskInputs } from "./ItemForm";
import validator from "validator";
import { priorityOptions, statusesOptions } from "./TaskForm";

export const validateTaskInputs = (taskInputs: TaskInputs): boolean => {
    let isValid = true;
    if (taskInputs.priority === PriorityType.Top && validator.trim(taskInputs.untilDate) === "") {
        alert("Please check your until date, it is an top task!");
        isValid = false;
    } else if (!statusesOptions.includes(taskInputs.status) || !priorityOptions.includes(taskInputs.priority)) {
        alert("Please check your inserted priority/status details!");
        isValid = false;
    }
    if (!validateEstimatedTime(taskInputs.estimatedTime)) {
        alert("Please check your estimated time!");
        isValid = false;
    }
    return isValid;
}

export const validateEventInputs = (eventInputs: EventInputs): boolean => {
    let isValid = true;
    if (validator.trim(eventInputs.beginningTime) === "" || validator.trim(eventInputs.endingTime) === "" || new Date(eventInputs.beginningTime) > new Date(eventInputs.endingTime)) {
        alert("Please check your beginning and ending times");
        isValid = false;
    }
    return isValid;
}

const validateEstimatedTime = (estimatedTime: string) => {
    if (validator.trim(estimatedTime) === "") {
        return false;
    } else {
        const estimatedTimeSplited = estimatedTime.match(/[a-zA-Z]+|[0-9]+/g);
        if (estimatedTimeSplited?.length !== 2) {
            return false;
        } else if (Number.isNaN((estimatedTimeSplited[0])) || !['w', 'd'].includes(estimatedTimeSplited[1])) {
            return false;
        }
        return true;
    }
}
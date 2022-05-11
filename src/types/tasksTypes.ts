import { IBasicType } from "./generalTypes";

export interface ITask extends IBasicType {
    estimatedTime: string;
    status: string;
    priority: IPriority;
    review?: string;
    timeSpent?: string;
    untilDate?: string;
}
export type IPriority = "Low" | "Regular" | "Top";
export type IStatus = 'Open' | 'In Progress' | 'Done';
export type TasksContextType = {
    tasks: ITask[];
    addTask: (newTask: ITask) => void;
    deleteTask: (id: string) => void;
    updateTask: (taskToUpdate: ITask) => void;
    getTask: (id: string) => ITask | null;
};
export interface ITasksFilter {
    selectedFilterStatus: IStatus | "",
    selectedFilterPriority: IPriority | "",
}


import { Task } from "../classes/Task";


export type Priority = "Low" | "Regular" | "Top";
export type Status = 'Open' | 'In Progress' | 'Done';
export type TasksContextType = {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (id: string) => void;
    updateTask: (taskToUpdate: Task) => void;
    getTask: (id: string) => Task | undefined;
};

export interface TasksFilter {
    selectedFilterStatus: Status | "",
    selectedFilterPriority: Priority | "",
}


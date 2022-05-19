import { Task } from "../classes/Task";


export enum Priority {
    Low = "Low",
    Regular = "Regular",
    Top = "Top"
}

export enum Status {
    Open = "Open",
    InProgress = "In Progress",
    Done = "Done"
}
export type TasksContextType = {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (id: string) => void;
    updateTask: (taskToUpdate: Task) => void;
    getTask: (id: string) => Task | undefined;
};



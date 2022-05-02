export interface ITask {
    id: string;
    title: string;
    description: string;
    estimatedTime: string;
    status: string;
    priority: IPriority;
    review?: string;
    timeSpent?: string;
    untilDate?: string;
}

export type IPriority = "Low" | "Regular" | "Top";
export type IStatus = 'Open' | 'In Progress' | 'Done';

export type TodoContextType = {
    todos: ITask[];
    addToDo: (todo: ITask) => void;
    deleteToDo: (id: string) => void;
    updateTodo: (todo: ITask) => void;
    getTask: (id: string) => ITask | null;
};


export type Order = 'asc' | 'desc';

export enum Actions {
    Create = 0,
    UPDATE = 1
};


import { IEvent } from "./eventsTypes";
import { Actions, ITask } from "./tasksTypes";


export interface MinTableItem {
    id: string;
}

export type otherColumnProperties<T> = Record<keyof T, string> | Record<string, string>;

export type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T | string, (it: T) => React.ReactNode>
>;
export type TableHeaders<T extends MinTableItem> = Record<keyof T, string> | Record<string, string>;

export type ItemFormType = "Task" | "Event";

export interface BasicType {
    id: string;
    title: string;
    description: string;
}

export type ItemFormContextType = {
    itemToUpdate: IEvent | ITask | "";
    isFormDialogOpen: boolean;
    handleCloseDialog(): void;
    handleOpenUpdateForm(item: ITask | IEvent): void;
    handleOpenCreateForm(): void;
}

export type DeleteItemFormContextType = {
    itemToDelete: IEvent | ITask | "";
    isDeleteDialogOpen: boolean;
    handleCloseDeleteDialog(): void;
    handleOpenDeleteDialog(item: ITask | IEvent): void;
}

export type FilterDashboardTableOption = "onlyTasks" | "onlyEvents" | "uncompletedTasks" | "highPriorityTasks"

export interface FilterDashboardTable {
    active: boolean;
    label: string;
    name: FilterDashboardTableOption;
}
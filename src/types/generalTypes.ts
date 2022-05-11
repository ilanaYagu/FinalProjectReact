import { IEvent } from "./eventsTypes";
import { ITask } from "./tasksTypes";


export interface IMinTableItem {
    id: string;
}

export type otherColumnProperties<T> = Partial<Record<keyof T, string>>;

export type CustomRenderers<T extends IMinTableItem> = Partial<
    Record<keyof T | string, (it: T) => React.ReactNode>
>;
export type TableHeaders<T extends IMinTableItem> = Partial<Record<keyof T, string>> | Record<"type" | "actions" | "other", string>;

export type ItemFormType = "Task" | "Event";

export interface IBasicType {
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

export type IFilterDashboardTableOption = "onlyTasks" | "onlyEvents" | "uncompletedTasks" | "highPriorityTasks"

export interface IFilterDashboardTable {
    active: boolean;
    label: string;
    name: IFilterDashboardTableOption;
}
import { Basic } from "../classes/Basic";

export interface MinTableItem {
    id: string;
}

export type otherColumnProperties<T> = Partial<Record<keyof T, string>>;

export type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T | string, (it: T) => React.ReactNode>
>;
export type TableHeaders<T extends MinTableItem> = Partial<Record<keyof T, string>> | Record<"type" | "actions" | "other", string>;

export type ItemFormType = "Task" | "Event";

export type ItemFormContextType = {
    itemToUpdate: Basic | "";
    isFormDialogOpen: boolean;
    handleCloseDialog(): void;
    handleOpenUpdateForm(item: Basic): void;
    handleOpenCreateForm(): void;
}

export type DeleteItemFormContextType = {
    itemToDelete: Basic | "";
    isDeleteDialogOpen: boolean;
    handleCloseDeleteDialog(): void;
    handleOpenDeleteDialog(item: Basic): void;
}

export type FilterDashboardTableOption = "onlyTasks" | "onlyEvents" | "uncompletedTasks" | "highPriorityTasks"

export interface FilterDashboardTable {
    active: boolean;
    label: string;
    name: FilterDashboardTableOption;
}
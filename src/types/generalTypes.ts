import { Basic } from "../classes/Basic";

export type otherColumnProperties<T> = Partial<Record<keyof T, string>>;

export type CustomRenderers<T> = Partial<
    Record<keyof T | string, (it: T) => React.ReactNode>
>;
export type TableHeaders<T> = Partial<Record<keyof T, string>> | Record<"type" | "actions" | "other", string>;

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


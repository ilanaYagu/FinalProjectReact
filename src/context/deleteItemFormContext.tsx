import { useState, createContext, PropsWithChildren } from 'react';
import { Basic } from '../classes/Basic';
import { DeleteItemFormContextType } from '../types/generalTypes';

export const DeleteItemFormContext = createContext<DeleteItemFormContextType>({
    itemToDelete: "",
    isDeleteDialogOpen: false,
    handleCloseDeleteDialog: () => { },
    handleOpenDeleteDialog: () => { }
});

const DeleteItemFormProvider = ({ children }: PropsWithChildren<{}>) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Basic | "">("");

    const handleOpenDeleteDialog = (item: Basic): void => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(item);
    };

    const handleCloseDeleteDialog = (): void => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    };

    return <DeleteItemFormContext.Provider value={{ itemToDelete, isDeleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog }}>{children}</DeleteItemFormContext.Provider>;
};

export default DeleteItemFormProvider;
import React, { useState, createContext, PropsWithChildren } from 'react';
import { Basic } from '../classes/Basic';
import { ItemFormContextType } from '../types/generalTypes';


export const ItemFormContext = createContext<ItemFormContextType>({
    itemToUpdate: "",
    isFormDialogOpen: false,
    handleCloseDialog: () => { },
    handleOpenUpdateForm: () => { },
    handleOpenCreateForm: () => { }
});

const ItemFormProvider = ({ children }: PropsWithChildren<{}>) => {

    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<Basic | "">("");

    const handleCloseDialog = (): void => {
        setIsFormDialogOpen(false);
        setItemToUpdate("");
    };

    const handleOpenUpdateForm = (item: Basic): void => {
        setIsFormDialogOpen(true);
        setItemToUpdate(item);
    };

    const handleOpenCreateForm = (): void => {
        setIsFormDialogOpen(true);
    }


    return <ItemFormContext.Provider value={{ isFormDialogOpen, itemToUpdate, handleCloseDialog, handleOpenUpdateForm, handleOpenCreateForm }}>{children}</ItemFormContext.Provider>;
};

export default ItemFormProvider;
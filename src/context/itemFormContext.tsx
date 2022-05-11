import React, { useContext, useState } from 'react';
import { IEvent } from '../types/eventsTypes';
import { ItemFormContextType } from '../types/generalTypes';
import { ITask } from '../types/tasksTypes';


export const ItemFormContext = React.createContext<ItemFormContextType | null>(null);

const ItemFormProvider: React.FC<React.ReactNode> = ({ children }) => {

    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState<ITask | IEvent | "">("");

    const handleCloseDialog = () => {
        setIsFormDialogOpen(false);
        setItemToUpdate("");
        console.log("closee" + isFormDialogOpen)
    };

    const handleOpenUpdateForm = (item: ITask | IEvent) => {
        setIsFormDialogOpen(true);
        setItemToUpdate(item);
    };

    const handleOpenCreateForm = () => {
        setIsFormDialogOpen(true);
    }


    return <ItemFormContext.Provider value={{ isFormDialogOpen, itemToUpdate, handleCloseDialog, handleOpenUpdateForm, handleOpenCreateForm }}>{children}</ItemFormContext.Provider>;
};

export default ItemFormProvider;
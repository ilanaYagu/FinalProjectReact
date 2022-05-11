import React, { useState } from 'react';
import { IEvent } from '../types/eventsTypes';
import { DeleteItemFormContextType } from '../types/generalTypes';
import { ITask } from '../types/tasksTypes';


export const DeleteItemFormContext = React.createContext<DeleteItemFormContextType | null>(null);

const DeleteItemFormProvider: React.FC<React.ReactNode> = ({ children }) => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<"" | ITask | IEvent>("");

    const handleOpenDeleteDialog = (item: ITask | IEvent) => {
        setIsDeleteDialogOpen(true);
        setItemToDelete(item);
    };


    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setItemToDelete("");
    };


    return <DeleteItemFormContext.Provider value={{ itemToDelete, isDeleteDialogOpen, handleOpenDeleteDialog, handleCloseDeleteDialog }}>{children}</DeleteItemFormContext.Provider>;
};

export default DeleteItemFormProvider;
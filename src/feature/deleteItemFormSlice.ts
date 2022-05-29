import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basic } from "../classes/Basic";

interface DeleteItemFormState {
    isDeleteDialogOpen: boolean;
    itemToDelete: Basic | "";
}
const initialDeleteItemFormState: DeleteItemFormState = {
    isDeleteDialogOpen: false,
    itemToDelete: ""
};

const deleteItemFormSlice = createSlice({
    name: 'deleteItemForm',
    initialState: initialDeleteItemFormState,
    reducers: {
        handleOpenDeleteDialog: (state, action: PayloadAction<Basic>): void => {
            state.isDeleteDialogOpen = true;
            state.itemToDelete = action.payload;
        },
        handleCloseDeleteDialog: (state): void => {
            state.isDeleteDialogOpen = false;
            state.itemToDelete = "";
        }
    }
})


export const { handleOpenDeleteDialog, handleCloseDeleteDialog } = deleteItemFormSlice.actions;
export default deleteItemFormSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basic } from "../classes/Basic";

interface ItemFormState {
    isFormDialogOpen: boolean;
    itemToUpdate: Basic | "";
}

const initialItemFormState: ItemFormState = {
    isFormDialogOpen: false,
    itemToUpdate: ""
};

const itemFormSlice = createSlice({
    name: 'itemForm',
    initialState: initialItemFormState,
    reducers: {
        handleCloseDialog: (state): void => {
            state.isFormDialogOpen = false;
            state.itemToUpdate = "";
        },
        handleOpenUpdateForm: (state, action: PayloadAction<Basic>): void => {
            state.isFormDialogOpen = true;
            state.itemToUpdate = action.payload;
        },
        handleOpenCreateForm: (state): void => {
            state.isFormDialogOpen = true;

        }
    }
})


export const { handleCloseDialog, handleOpenUpdateForm, handleOpenCreateForm } = itemFormSlice.actions;
export default itemFormSlice.reducer;
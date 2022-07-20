import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface InitialState {
    modalIsOpen: boolean;
    modalName: string;
    confirmState: boolean;
    confirmWidth: number;
    confirmHeight: number;
    confirmMessage: string;
    confirmType: string;
}

// InitialState
const initialState: InitialState = {
    modalIsOpen: false,
    modalName: '',
    confirmState: false,
    confirmWidth: 400,
    confirmHeight: 310,
    confirmMessage: 'this is default message',
    confirmType: '',
};

// Reducer Slice
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeOpenState(state, action: PayloadAction<boolean>) {
            state.modalIsOpen = action.payload;
        },
        changeModalName(state, action:PayloadAction<string>) {
            state.modalName = action.payload;
        },
        changeConfirmState(state, action:PayloadAction<boolean>) {
            state.confirmState = action.payload;
        },
        changeConfirmProps(state, action:PayloadAction<any>) {
            state.confirmWidth = action.payload.width;
            state.confirmHeight = action.payload.height;
            state.confirmMessage = action.payload.message;
            state.confirmType = action.payload.type;
        }
    },
});

export const {
    changeOpenState,
    changeModalName,
    changeConfirmState,
    changeConfirmProps
} = modalSlice.actions;

export default modalSlice.reducer

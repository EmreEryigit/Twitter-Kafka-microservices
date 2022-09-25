import { createSlice } from "@reduxjs/toolkit";

interface setErrorsAction {
    type: string;
    payload: [{ message: string; field?: string }];
}
interface InitialState {
    errors: [{ message: string; field?: string }] | null;
}
const initialState: InitialState = {
    errors: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setErrors: (state, action: setErrorsAction) => {
            state.errors = action.payload;
        },
    },
});

export default errorSlice;
export const errorActions = errorSlice.actions;

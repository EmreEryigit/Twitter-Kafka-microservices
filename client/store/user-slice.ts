import { createSlice } from "@reduxjs/toolkit";

interface setUserAction {
    type: string;
    payload: User | null;
}

interface InitialState {
    user: User | null;
}

let initialState: InitialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: setUserAction) => {
            state.user = action.payload;
        },
    },
});

export default userSlice;
export const userActions = userSlice.actions;

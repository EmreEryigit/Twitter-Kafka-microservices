import { createSlice } from "@reduxjs/toolkit";

interface setUserAction {
    type: string;
    payload: User;
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
            state.user = {
                email: action.payload.email,
                id: action.payload.id,
            };
        },
    },
});

export default userSlice;
export const userActions = userSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import errorSlice from "./error-slice";
import notificationSlice from "./notificationSlice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        error: errorSlice.reducer,
        notification: notificationSlice.reducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

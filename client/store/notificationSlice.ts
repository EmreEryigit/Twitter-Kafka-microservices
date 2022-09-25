import { createSlice } from "@reduxjs/toolkit";

export enum RequestStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed",
    none = "none",
}
interface SetNotificationAction {
    type: string;
    payload: RequestStatus;
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notification: RequestStatus.none,
    },
    reducers: {
        setNotification: (state, action: SetNotificationAction) => {
            state.notification = action.payload;
        },
    },
});
export default notificationSlice;
export const notificationActions = notificationSlice.actions;

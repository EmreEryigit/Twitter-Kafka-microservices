import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import React, { ReactNode, useEffect } from "react";
import { RequestStatus } from "../store/notificationSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { userActions } from "../store/user-slice";

const RequestModal = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();
  
    const notification = useAppSelector(
        (state: RootState) => state.notification.notification
    );

    useEffect(() => {
        console.log("Modal fired!");
        dispatch(userActions.setUser(user));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const openNotify = (
        title: string,
        message: string,
        loading: boolean,
        autoClose: boolean | number,
        color: string,
        id: string,
        icon?: ReactNode
    ) => {
        showNotification({
            title,
            message,
            loading,
            autoClose,
            color,
            id,
            icon,
        });
    };
    useEffect(() => {
        if (notification === RequestStatus.pending) {
            const title = "Request processing...";
            const message = "Please a wait a little while";
            const loading = true;
            const autoClose = 2000;
            const color = "blue";
            const id = "load-data:pending";
            openNotify(title, message, loading, autoClose, color, id);
        }
        if (notification === RequestStatus.completed) {
            const title = "Success...";
            const message = "Your request processed successfully";
            const loading = false;
            const autoClose = 2500;
            const color = "teal";
            const id = "load-data:completed";
            const icon = <IconCheck />;
            openNotify(title, message, loading, autoClose, color, id, icon);
            updateNotification({
                id: "load-data:pending",
                message,
                title,
                autoClose: 100,
            });
        }
        if (notification === RequestStatus.failed) {
            const title = "Something went wrong";
            const message = "There was an issue while processing...";
            const loading = false;
            const autoClose = 2500;
            const color = "red";
            const id = "load-data:failed";
            updateNotification({
                id: "load-data:pending",
                message,
                title,
                autoClose: 100,
            });
            openNotify(title, message, loading, autoClose, color, id);
        }
    }, [notification]);

    return <div></div>;
};

export default RequestModal;

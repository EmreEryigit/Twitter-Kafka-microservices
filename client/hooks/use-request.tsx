import axios from "axios";
import { errorActions } from "../store/error-slice";
import { notificationActions, RequestStatus } from "../store/notificationSlice";
import { useAppDispatch } from "../store/store";

interface Hook {
    url: string;
    method: "get" | "post" | "delete" | "patch";
    body: any;
    onSuccess: any;
}

const useRequest = ({ url, method, body, onSuccess }: Hook) => {
    const dispatch = useAppDispatch();

    const doRequest = async (props = {}) => {
        dispatch(notificationActions.setNotification(RequestStatus.pending));

        try {
            const response = await axios[method](url, {
                ...body,
                ...props,
            });

            if (response.status < 400) {
                await onSuccess(response.data);
                 dispatch(
                    notificationActions.setNotification(RequestStatus.completed)
                );
            } else {
                dispatch(
                    notificationActions.setNotification(RequestStatus.failed)
                );
            }
            return response.data;
        } catch (err: any) {
            dispatch(notificationActions.setNotification(RequestStatus.failed));
            dispatch(errorActions.setErrors(err.response.data.errors));
        }
    };

    return { doRequest };
};
export default useRequest;

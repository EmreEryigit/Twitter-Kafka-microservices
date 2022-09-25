import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store, { useAppDispatch } from "../store/store";
import { NotificationsProvider } from "@mantine/notifications";
import RequestModal from "../components/RequestModal";
import buildClient from "../utils/build-client";
import { userActions } from "../store/user-slice";

interface pagePropsWithUser {
    user: User;
}

interface AppPropsWithCustomProps {
    Component: AppProps["Component"];
    pageProps: pagePropsWithUser;
}
function MyApp({ Component, pageProps }: AppPropsWithCustomProps) {
    console.log(pageProps);

    return (
        <MantineProvider theme={{ colorScheme: "dark" }}>
            <NotificationsProvider>
                <Provider store={store}>
                    <div>
                        <RequestModal user={pageProps.user} />
                        <Component {...pageProps} />
                    </div>
                </Provider>
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default MyApp;

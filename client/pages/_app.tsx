import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "../store/store";
import { NotificationsProvider } from "@mantine/notifications";
import RequestModal from "../components/RequestModal";
import buildClient from "../utils/build-client";
import { userActions } from "../store/user-slice";
import { useEffect, useState } from "react";
import App from "next/app";
import WrapperSkeleton from "../components/Wrapper";

interface pagePropsWithUser {
    user: User;
}

interface AppPropsWithCustomProps {
    Component: AppProps["Component"];
    pageProps: pagePropsWithUser;
}
const MyApp = ({ Component, pageProps }: AppPropsWithCustomProps) => {
    const { user } = pageProps;
    const [userState, setUserState] = useState<User | null>();
    useEffect(() => {
        if (user) {
            setUserState(user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    return (
        <MantineProvider theme={{ colorScheme: "dark" }}>
            <NotificationsProvider>
                <Provider store={store}>
                    <RequestModal user={user!} />
                    <WrapperSkeleton>
                        <Component {...pageProps} />
                    </WrapperSkeleton>
                </Provider>
            </NotificationsProvider>
        </MantineProvider>
    );
};

MyApp.getInitialProps = async (context: AppContext) => {
    const client = buildClient(context.ctx.req);
    const { data } = await client.get("/api/user/currentuser");

    const appProps = await App.getInitialProps(context);
    appProps.pageProps = {
        user: data.user,
    };

    return {
        ...appProps,
    };
};

/* export async function getServerSideProps(context: AppContext) {
    const client = buildClient(context.ctx.req);
    const { data } = await client.get("/api/user/currentuser");
    console.log("_app data server side", data);
    return {
        props: {
            ...data,
        },
    };
} */

export default MyApp;

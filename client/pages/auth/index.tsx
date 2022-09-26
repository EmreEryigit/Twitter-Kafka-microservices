import React from "react";
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Group,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FloatingLabelInput } from "../../components/FloatingLabelInput";
import { userActions } from "../../store/user-slice";
import useRequest from "../../hooks/use-request";
import { useAppDispatch } from "../../store/store";
import buildClient from "../../utils/build-client";
import { NextPageContext } from "next";
import { IconArrowLeftBar, IconArrowRight } from "@tabler/icons";
import Router from "next/router";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "flex-end",
        backgroundImage:
            "url(https://images.unsplash.com/photo-1568861368385-3534aca5cf41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
    },

    form: {
        borderLeft: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[3]
        }`,
        minHeight: "100vh",
        maxWidth: 450,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: "100%",
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        width: 120,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    },
}));
const AuthPage = () => {
    const dispatch = useAppDispatch();
    const [type, toggle] = useToggle(["login", "register"]);
    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(value)
                    ? null
                    : "Invalid email",
            name: (value) =>
                /^[a-z0-9]{3,30}$/i.test(value) ? null : "Invalid name",
            /* password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{5,16}$/.test(
                    value
                )
                    ? null
                    : "Password too weak", */
        },
    });

    // form submition
    const { doRequest } = useRequest({
        url: "/api/user/signup",
        method: "post",
        body: form.values,
        onSuccess: (data: any) => {
            dispatch(userActions.setUser(data.user));
            Router.push('/')
        },
    });
    const submitHandler = async (values: {
        name: string;
        email: string;
        password: string;
    }) => {
        const isValid = form.validate();
        if (isValid.hasErrors) {
            return;
        }
        await doRequest();
    };

    //

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title
                    order={2}
                    className={classes.title}
                    align="center"
                    mt="md"
                    mb={50}
                >
                    {type === "register"
                        ? "Create Account"
                        : "Welcome Back! Login"}
                </Title>

                <form
                    onSubmit={form.onSubmit((values) => submitHandler(values))}
                >
                    {type === "register" && (
                        <FloatingLabelInput
                            withAsterisk
                            label="Name"
                            placeholder="Your name"
                            onBlur={() => form.validateField("name")}
                            {...form.getInputProps("name")}
                        />
                    )}

                    <FloatingLabelInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        onBlur={() => form.validateField("email")}
                        {...form.getInputProps("email")}
                    />

                    <FloatingLabelInput
                        password="true"
                        withAsterisk
                        label="Password"
                        onBlur={() => form.validateField("password")}
                        {...form.getInputProps("password")}
                    />

                    <Checkbox label="Keep me logged in" mt="xl" size="md" />
                    <Group position="center" mt="xl">
                        <Button
                            fullWidth
                            type="submit"
                            variant="gradient"
                            gradient={{ from: "purple", to: "blue", deg: 135 }}
                        >
                            {upperFirst(type)}
                        </Button>

                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === "register"
                                ? `Already have an account? Login`
                                : "Don't have an account? Register"}
                        </Anchor>
                        <IconArrowRight />
                    </Group>
                </form>
            </Paper>
        </div>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const client = buildClient(context.req);
    const { data } = await client.get("/api/user/currentuser");

    return {
        props: {
            ...data,
        },
    };
}

export default AuthPage;

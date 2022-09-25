import { Button, createStyles, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage, NextPageContext } from "next";
import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { userActions } from "../../store/user-slice";
import buildClient from "../../utils/build-client";
import classes from "../../styles/Signup.module.css";
import { FloatingLabelInput } from "../../components/FloatingLabelInput";

const SignUpPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.user.user);
    const inputArray = ["name", "email"];
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
    const { doRequest } = useRequest({
        url: "/api/user/signup",
        method: "post",
        body: form.values,
        onSuccess: (data: any) => {
            dispatch(userActions.setUser(data.user));
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
    
    return (
        <div className={classes.container}>
            <div className={classes.container__photo}></div>
            <form
                className={classes.container__form}
                onSubmit={form.onSubmit((values) => submitHandler(values))}
            >
                {inputArray.map((input) => {
                    return (
                        <FloatingLabelInput
                            key={input}
                            withAsterisk
                            label={input.toUpperCase()}
                            placeholder={`Your ${input}`}
                            onBlur={() => form.validateField(input)}
                            {...form.getInputProps(input)}
                        />
                    );
                })}

              
                <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="*****"
                    onBlur={() => form.validateField("password")}
                    {...form.getInputProps("password")}
                />
                <Button type="submit">Submit</Button>
            </form>
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

export default SignUpPage;

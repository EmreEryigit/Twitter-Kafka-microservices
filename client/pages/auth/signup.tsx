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

    return (
        <div className={classes.container}>
            <div className={classes.container__photo}></div>
        </div>
    );
};



export default SignUpPage;

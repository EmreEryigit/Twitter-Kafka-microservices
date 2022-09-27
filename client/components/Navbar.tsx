import { MouseEvent, useEffect, useState } from "react";
import {
    createStyles,
    Navbar,
    Group,
    Code,
    useMantineTheme,
    ColorSwatch,
} from "@mantine/core";
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
    IconLogin,
    IconHome,
    TablerIcon,
} from "@tabler/icons";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { userActions } from "../store/user-slice";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[1]
                    : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                color: theme.colorScheme === "dark" ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color:
                        theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[2]
                    : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.fn.variant({
                    variant: "light",
                    color: 'grape',
                }).background,
                color: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({
                        variant: "light",
                        color: theme.primaryColor,
                    }).color,
                },
            },
        },
    };
});
const data = [
    { link: "/", label: "Home", icon: IconHome },
    { link: "", label: "Notifications", icon: IconBellRinging },
    { link: "/auth", label: "Login", icon: IconLogin },
];
export function NavBarSide() {
    const user = useAppSelector((state: RootState) => state.user.user);
    let items: {
        link: string;
        label: string;
        icon: TablerIcon;
    }[];
    if (!user) {
        items = data;
    } else {
        items = [
            { link: "/", label: "Home", icon: IconHome },
            { link: "", label: "Notifications", icon: IconBellRinging },
        ];
    }

    const dispatch = useAppDispatch();
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Home");
    const logoutHandler = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        await axios.post("/api/user/signout").then(() => {
            dispatch(userActions.setUser(null));
        });
    };

    const links = items.map((item) => (
        <a
            key={item!.label}
            className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
            })}
            onClick={(event) => {
                event.preventDefault();
                Router.push(item.link);
                setActive(item.label);
            }}
        >
            <>
                <item.icon className={classes.linkIcon} stroke={1.5} />
                <span>{item.label}</span>
            </>
        </a>
    ));

    const theme = useMantineTheme();
    const swatches = Object.keys(theme.colors)
        .slice(0, 5)
        .map((color) => (
            <ColorSwatch
                key={color}
                color={theme.fn.rgba(theme.colors[color][6], 0.5)}
            />
        ));

    return (
        <Navbar height={"95vh"} width={{ sm: 200, lg: 300 }} p="md">
            <Navbar.Section grow>{links}</Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {user && (
                    <a
                        href="#"
                        className={classes.link}
                        onClick={logoutHandler}
                    >
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </a>
                )}
                <Group position="center" spacing="xs">
                    {swatches}
                </Group>
            </Navbar.Section>
        </Navbar>
    );
}

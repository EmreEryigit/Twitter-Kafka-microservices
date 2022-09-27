import { ReactNode, useState } from "react";
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
} from "@mantine/core";
import { useRouter } from "next/router";
import { NavBarSide } from "./Navbar";
import { ToggleColorMode } from "./ToggleColorMode";
import { IconBrandTwitter } from "@tabler/icons";

export default function WrapperSkeleton({ children }: { children: ReactNode }) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const router = useRouter();
    const isLoginScreen = router.pathname === "/auth";
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            hidden={isLoginScreen}
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 200, lg: 300 }}
                >
                    <NavBarSide />
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: "none" }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Group p={"lg"}>
                            <IconBrandTwitter
                                color="indigo"
                                size={48}
                                stroke={2}
                            />
                        </Group>
                        <ToggleColorMode />
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}

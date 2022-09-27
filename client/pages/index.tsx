import type { NextPage } from "next";
import axios from "axios";
import useSWR from "swr";
import {
    Card,
    Group,
    Loader,
    Text,
    createStyles,
    Image,
    Badge,
    Avatar,
    Button,
    CloseButton,
    Modal,
} from "@mantine/core";
import { IconArrowBack, IconHearts, IconMessageCircle2 } from "@tabler/icons";
import Link from "next/link";
import moment from "moment";
import Router from "next/router";
import { RootState, useAppSelector } from "../store/store";
import { useState } from "react";
import DrawerWrapper from "../components/Drawer";

// for turkish language
/* import 'moment/locale/tr' */
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useStyles = createStyles((theme) => ({
    commentIcon: {
        position: "relative",
    },
    commentIconCount: {
        position: "absolute",
        top: "-12px",
        left: "20px",
        fontSize: "16px",
    },

    container: {
        width: "60vw",
        display: "flex",
        justifyContent: "center",
        alignContent: "stretch",
        flexDirection: "column",
        margin: "0 auto",
    },
    icon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[5],
    },

    name: {
        color: "white",
        fontSize: "16px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

const Home: NextPage = () => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const user = useAppSelector((state: RootState) => state.user.user);

    const { data, error, isValidating } = useSWR<{ posts: Post[] }>(
        "/api/post",
        fetcher
    );
    if (isValidating) {
        return <Loader size="xl" variant="bars" />;
    }
    // for tr
    /* moment.locale("tr"); */

    const postDeleteHandler = async (postId: number) => {
        await axios.delete(`/api/post/${postId}`).then(() => {
            setOpened(false);
        });
    };
    return (
        <div className={classes.container}>
            <Group align={"center"} spacing={0} p="lg">
                {user && <DrawerWrapper />}
            </Group>

            {data?.posts.reverse().map((post: Post) => {
                return (
                    <Card
                        shadow="sm"
                        p="xl"
                        m={"xl"}
                        mt={"md"}
                        pt={"0"}
                        radius="md"
                        key={post.id}
                        withBorder
                    >
                        <Group
                            position="apart"
                            mt="md"
                            mb="xs"
                            style={{ position: "relative" }}
                        >
                            <Group noWrap align={"center"}>
                                <Avatar src={""} size={45} radius="md" />
                                <div>
                                    <Text
                                        size="lg"
                                        weight={500}
                                        className={classes.name}
                                        onClick={() =>
                                            Router.push(`/post/${post.id}`)
                                        }
                                    >
                                        {post.userName}
                                    </Text>
                                    <Text
                                        color={"dimmed"}
                                        size="md"
                                        weight={300}
                                        onClick={() =>
                                            Router.push(`/post/${post.id}`)
                                        }
                                    >
                                        {moment(post.createdAt).fromNow()}
                                    </Text>
                                </div>
                            </Group>

                            <Link href={`/post/${post.id}`}>
                                <a>
                                    <Badge
                                        mt={"lg"}
                                        variant="gradient"
                                        gradient={{
                                            from: "purple",
                                            to: "blue",
                                            deg: 45,
                                        }}
                                    >
                                        See this post
                                    </Badge>
                                </a>
                            </Link>
                            {post.userId === user?.id && (
                                <Badge
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                    color="red"
                                    variant="gradient"
                                    gradient={{
                                        from: "red",
                                        to: "pink",
                                        deg: 45,
                                    }}
                                >
                                    <CloseButton
                                        onClick={() => setOpened(true)}
                                    />
                                    <Modal
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                        centered
                                        style={{ fontSize: "24px" }}
                                    >
                                        <Text
                                            p={"md"}
                                            size={"md"}
                                            color={"dimmed"}
                                            align="center"
                                        >
                                            Are you sure you want to delete this
                                            post?
                                        </Text>
                                        <Group
                                            align={"center"}
                                            position="center"
                                        >
                                            <Button
                                                onClick={() =>
                                                    postDeleteHandler(post.id)
                                                }
                                                size="md"
                                                variant="gradient"
                                                gradient={{
                                                    from: "pink",
                                                    to: "red",
                                                    deg: 45,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                size="md"
                                                onClick={() => setOpened(false)}
                                                variant="gradient"
                                                gradient={{
                                                    from: "blue",
                                                    to: "indigo",
                                                    deg: 45,
                                                }}
                                            >
                                                Close
                                            </Button>
                                        </Group>
                                    </Modal>
                                </Badge>
                            )}
                        </Group>

                        {/*  <Text size="sm" color="dimmed"></Text> */}

                        <Card.Section>
                            <Text p={"md"} size={"md"} color={"dimmed"}>
                                {post.context}
                            </Text>
                        </Card.Section>

                        <Card.Section>
                            {post.img && (
                                <Image
                                    src={post.img}
                                    height={"350"}
                                    width={"100%"}
                                    alt="Norway"
                                />
                            )}
                        </Card.Section>

                        <Group position="apart" mt={"lg"}>
                            <div className={classes.commentIcon}>
                                <span className={classes.commentIconCount}>
                                    {post.commentCount}
                                </span>
                                <IconMessageCircle2 />
                            </div>
                            <div className={classes.commentIcon}>
                                <span className={classes.commentIconCount}>
                                    {post.commentCount}
                                </span>
                                <IconHearts />
                            </div>
                            <div className={classes.commentIcon}>
                                <span className={classes.commentIconCount}>
                                    {post.commentCount}
                                </span>
                                <IconArrowBack />
                            </div>
                        </Group>
                    </Card>
                );
            })}
        </div>
    );
};

export default Home;

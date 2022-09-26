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
} from "@mantine/core";
import { IconArrowBack, IconHearts, IconMessageCircle2 } from "@tabler/icons";
import Router from "next/router";
import Link from "next/link";
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

    const { data, error, isValidating } = useSWR("/api/post", fetcher);
    if (isValidating) {
        return <Loader size="xl" variant="bars" />;
    }
    return (
        <div className={classes.container}>
            {data?.posts.map((post: Post) => {
                return (
                    <Card
                        /* onClick={() => Router.push(`/post/${post.id}`)} */
                        shadow="sm"
                        p="xl"
                        m={"xl"}
                        mt={"md"}
                        pt={"0"}
                        radius="md"
                        key={post.id}
                        withBorder
                    >
                        <Group position="apart" mt="md" mb="xs">
                            <Group noWrap align={"center"}>
                                <Avatar src={""} size={45} radius="md" />
                                <div>
                                    <Text
                                        size="lg"
                                        weight={500}
                                        className={classes.name}
                                    >
                                        {post.userName}
                                        {/*  {post.title} */}
                                    </Text>
                                </div>
                            </Group>
                            {/*  <Badge color="pink" variant="light">
                        On Sale
                    </Badge> */}
                            <Link href={`/post/${post.id}`}>
                                <a>
                                    <Badge variant="gradient" color={"grape"}>
                                        See this post
                                    </Badge>
                                </a>
                            </Link>
                        </Group>

                        {/*  <Text size="sm" color="dimmed"></Text> */}

                        <Card.Section>
                            <Text p={"md"} size={"md"} color={"white"}>
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

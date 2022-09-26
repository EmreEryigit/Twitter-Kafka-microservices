import type { NextPage } from "next";

import axios from "axios";
import useSWR from "swr";
import {
    Badge,
    Button,
    Card,
    Group,
    Loader,
    Text,
    Avatar,
    createStyles,
    Image,
} from "@mantine/core";
import {
    IconArrowAutofitContent,
    IconArrowBack,
    IconHeart,
    IconHeartMinus,
    IconHearts,
    IconMessage,
    IconMessageCircle,
    IconMessageCircle2,
} from "@tabler/icons";
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
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

const Home: NextPage = () => {
    const { classes } = useStyles();

    const { data, error, isValidating } = useSWR("/api/post", fetcher);
    console.log(data);
    if (isValidating) {
        return <Loader size="xl" variant="bars" />;
    }
    return (
        <div className={classes.container}>
            {data?.posts.map((post: Post) => {
                return (
                    <Card
                        shadow="sm"
                        p="xl"
                        m={"xl"}
                        mt={"md"}
                        pt={"0"}
                        radius="md"
                        withBorder
                        key={post.id}
                    >
                        <Group position="apart" mt="md" mb="xs">
                            <Group noWrap align={'center'}>
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
                        </Group>

                        {/*  <Text size="sm" color="dimmed"></Text> */}

                        <Card.Section>
                            <Text p={"md"} size={"xl"} color={"white"}>
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

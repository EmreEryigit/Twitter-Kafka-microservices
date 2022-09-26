import {
    Avatar,
    Badge,
    Button,
    Card,
    createStyles,
    Divider,
    Group,
    Image,
    Loader,
    LoadingOverlay,
    Text,
    Textarea,
} from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import useRequest from "../../hooks/use-request";

const useStyles = createStyles((theme) => ({
    container: {
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        alignContent: "stretch",
        flexDirection: "column",
        margin: "0 auto",
    },
    name: {
        color: "white",
        fontSize: "16px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
        color: "white",
        fontSize: "16px",
        width: "100%",
        height: "100%",
        wordWrap: "normal",
        display: "flex",
    },
    flexContainer: {
        margin: "5px",
        padding: "10px",
    },
}));

const PostPage: NextPage = () => {
    const { classes } = useStyles();
    const [textAreaComment, setTextAreaComment] = useState("");
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);

    const router = useRouter();
    const { postId } = router.query;
    const { data, error, isValidating, mutate } = useSWR(
        `/api/post/${postId}`,
        fetcher
    );
    const {
        data: commentsData,
        error: commentError,
        isValidating: commentLoading,
    } = useSWR(`/api/comment/${postId}`, fetcher);
    const { doRequest } = useRequest({
        url: `/api/comment/${data?.post.id}`,
        method: "post",
        body: {
            text: textAreaComment,
        },
        onSuccess: async (data: Comment) => {
            console.log(data);
        },
    });

    if (error) {
        return <div>Sorry Requested Page is not available...</div>;
    }

    const postComment = async () => {
        if (textAreaComment.trim() === "") {
            return;
        }
        doRequest();
    };

    return (
        <div className={classes.container}>
            <LoadingOverlay
                loaderProps={{ size: "xl", color: "purple", variant: "bars" }}
                visible={isValidating || commentLoading}
                transitionDuration={500}
            />
            <Card
                /* onClick={() => Router.push(`/post/${post.id}`)} */
                shadow="sm"
                p="xl"
                m={"xl"}
                mt={"md"}
                pt={"0"}
                radius="md"
                key={data?.post.id}
                withBorder
            >
                <Group position="apart" mt="md" mb="xs">
                    <Group noWrap align={"center"}>
                        <Avatar src={""} radius="xl" />
                        <div>
                            <Text
                                size="lg"
                                weight={500}
                                className={classes.name}
                            >
                                {data?.post.userName}

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
                        {data?.post.context}
                    </Text>
                </Card.Section>

                <Card.Section>
                    {data?.post.img && (
                        <Image
                            src={data?.post.img}
                            height={"350"}
                            width={"100%"}
                            alt="Norway"
                        />
                    )}
                </Card.Section>
                <Divider mt={"lg"} />
                {commentsData?.postComments?.map((comment: Comment) => {
                    return (
                        <>
                            <div
                                className={classes.flexContainer}
                                key={comment.id}
                            >
                                <Group>
                                    <Avatar src={""} radius="xl" />
                                    <div>
                                        <Text size="sm">
                                            {comment.userName}
                                        </Text>
                                        <Text size="xs" color="dimmed">
                                            {/*     {postedAt} */}asdf
                                        </Text>
                                    </div>
                                </Group>
                                <Text className={classes.body} size="sm">
                                    {comment.text}
                                </Text>
                            </div>
                            <Divider />
                        </>
                    );
                })}

                <Textarea
                    value={textAreaComment}
                    onChange={(e) => setTextAreaComment(e.currentTarget.value)}
                    mt={"lg"}
                    radius={"lg"}
                    p={"md"}
                    label="Your comment"
                    inputMode="text"
                />
                <Button
                    onClick={postComment}
                    size="md"
                    fullWidth
                    variant="gradient"
                    gradient={{ from: "purple", to: "blue", deg: 45 }}
                >
                    Leave a comment!
                </Button>
            </Card>
        </div>
    );
};

export default PostPage;

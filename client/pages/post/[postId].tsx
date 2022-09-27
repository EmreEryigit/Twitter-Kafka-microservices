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
import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import useRequest from "../../hooks/use-request";
import { RootState, useAppSelector } from "../../store/store";

const useStyles = createStyles((theme) => ({
    container: {
        width: "75vw",
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
    loading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 999,
    },
}));

const PostPage: NextPage = () => {
    const { classes } = useStyles();
    const [textAreaComment, setTextAreaComment] = useState("");
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);

    const user = useAppSelector((state: RootState) => state.user.user);

    const router = useRouter();
    const { postId } = router.query;

    // fetch post
    const { data, error, isValidating, mutate } = useSWR<{ post: Post }>(
        `/api/post/${postId}`,
        fetcher
    );

    // fetch comments for post
    const {
        data: commentsData,
        error: commentError,
        isValidating: commentLoading,
    } = useSWR<{ postComments: Comment[] }>(`/api/comment/${postId}`, fetcher);
    // post comment
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
        setTextAreaComment("");
    };

    return (
        <div className={classes.container}>
            <LoadingOverlay
                loaderProps={{ size: "xl", color: "purple", variant: "bars" }}
                visible={isValidating}
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
                            </Text>
                            <Text size="md" weight={300} color="dimmed">
                                {moment(data?.post.createdAt).fromNow()}
                            </Text>
                        </div>
                    </Group>
                </Group>
                <Card.Section>
                    <Text p={"md"} size={"xl"} color={"dimmed"}>
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

                {user && (
                    <>
                        <Textarea
                            value={textAreaComment}
                            onChange={(e) =>
                                setTextAreaComment(e.currentTarget.value)
                            }
                            my={"lg"}
                            radius={"lg"}
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
                    </>
                )}
                <Divider mt={"lg"} />
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <LoadingOverlay
                        loaderProps={{
                            size: "xl",
                            color: "purple",
                            variant: "bars",
                        }}
                        className={classes.loading}
                        visible={commentLoading}
                        transitionDuration={500}
                    />
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
                                            <Text size="lg">
                                                {comment.userName}
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                {moment(
                                                    comment.createdAt
                                                ).fromNow()}
                                            </Text>
                                        </div>
                                    </Group>
                                    <Text
                                        className={classes.body}
                                        color="dimmed"
                                        size="sm"
                                    >
                                        {comment.text}
                                    </Text>
                                </div>
                                <Divider />
                            </>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default PostPage;

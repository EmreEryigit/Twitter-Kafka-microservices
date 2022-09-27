import { useState } from "react";
import {
    Drawer,
    Button,
    Group,
    Textarea,
    TextInput,
    createStyles,
    Divider,
} from "@mantine/core";
import useRequest from "../hooks/use-request";

const useStyles = createStyles({
    shareButton: {
        position: "absolute",
        top: 90,
        right: 20,
    },
    backGroundDiv: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        background: " linear-gradient( 90deg,purple, #364FC7 );",
    },
});

function DrawerWrapper() {
    const [opened, setOpened] = useState(false);
    const [context, setContext] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const { doRequest } = useRequest({
        url: "/api/post",
        method: "post",
        body: {
            context,
            img: imgUrl,
        },
        onSuccess: async () => {},
    });

    const createPostHandler = async () => {
        if (context.trim() === "") {
            return;
        }
        doRequest();
        setContext("");
        setImgUrl("");
        setOpened(false);
    };
    const { classes } = useStyles();
    return (
        <>
            <Drawer opened={opened} onClose={() => setOpened(false)} size="xl">
                <>
                    <Textarea
                        required
                        style={{ display: "block", width: "100%" }}
                        value={context}
                        onChange={(e) => setContext(e.currentTarget.value)}
                        mt={"lg"}
                        label="Share something"
                        inputMode="text"
                    />
                    <TextInput
                        style={{
                            display: "block",
                            width: "100%",
                        }}
                        mt={"lg"}
                        label="Image Url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.currentTarget.value)}
                    />
                    <Button
                        onClick={createPostHandler}
                        size="md"
                        fullWidth
                        mt={"md"}
                        variant="gradient"
                        gradient={{ from: "purple", to: "indigo", deg: 45 }}
                    >
                        Share Post!
                    </Button>
                    <Divider mb={"md"} />
                    <div className={classes.backGroundDiv}></div>
                </>
            </Drawer>

            <Group position="center">
                <Button
                    size="md"
                    variant="gradient"
                    gradient={{ from: "blue", to: "purple", deg: 45 }}
                    className={classes.shareButton}
                    onClick={() => setOpened(true)}
                >
                    Share a Post
                </Button>
            </Group>
        </>
    );
}

export default DrawerWrapper;

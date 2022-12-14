import { useState } from "react";
import { TextInput, createStyles, PasswordInput } from "@mantine/core";

const useStyles = createStyles(
    (theme, { floating }: { floating: boolean }) => ({
        root: {
            position: "relative",
        },

        label: {
            position: "absolute",
            zIndex: 2,
            top: 7,
            left: theme.spacing.sm,
            pointerEvents: "none",
            color: floating
                ? theme.colorScheme === "dark"
                    ? theme.white
                    : theme.black
                : theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
            transition:
                "transform 150ms ease, color 150ms ease, font-size 150ms ease",
            transform: floating
                ? `translate(-${theme.spacing.sm}px, -28px)`
                : "none",
            fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
            fontWeight: floating ? 500 : 400,
        },

        required: {
            transition: "opacity 150ms ease",
            opacity: floating ? 1 : 0,
        },

        input: {
            "&::placeholder": {
                transition: "color 150ms ease",
                color: !floating ? "transparent" : undefined,
            },
        },
    })
);

interface InputProps {
    label: string;
    placeholder: string;
    onBlur: () => void;
    value: string;
    password?: boolean;
}

export function FloatingLabelInput(props: InputProps) {
    const [focused, setFocused] = useState(false);
    const { classes } = useStyles({
        floating: props.value.trim().length !== 0 || focused,
    });

    if (props.password) {
        return (
            <PasswordInput
                {...props}
                required
                classNames={classes}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                mt="xl"
                autoComplete="nope"
            />
        );
    }

    return (
        <TextInput
            {...props}
            classNames={classes}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="xl"
            autoComplete="yes"
        />
    );
}

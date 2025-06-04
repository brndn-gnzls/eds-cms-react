// src/components/Button.stories.jsx
import React from "react";
import Button from "./Button";

export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            control: { type: "radio", options: ["primary", "secondary"] },
        },
        size: {
            control: { type: "select", options: ["large", "small"] },
        },
        children: { control: { type: "text" } },
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    variant: "primary",
    size: "large",
    children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
    variant: "secondary",
    size: "large",
    children: "Secondary Button",
};
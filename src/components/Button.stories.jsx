// src/components/Button.stories.jsx
import React from "react";
import Button from "./Button";

export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        variant: {
            options: ["primary", "disabled"],
            control: { type: "radio" },
        },
        size: {
            options: ["large", "small"],
            control: { type: "select" },
        },
        children: { control: "text" },
    },
};

const Template = (args) => <Button {...args} />;

export const AnthemButton = Template.bind({});
AnthemButton.args = {
    brand: "Anthem",
    variant: "primary",
    size: "large",
    children: "Anthem Primary",
};

export const HealthyBlueButton = Template.bind({});
HealthyBlueButton.args = {
    brand: "HealthyBlue",
    variant: "primary",
    size: "large",
    children: "HealthyBlue Primary",
};
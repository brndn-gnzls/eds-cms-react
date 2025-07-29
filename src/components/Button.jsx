import React from "react";
import tokens from "../../token_build/js/tokens";
import '../styles/fonts.css';

const Button = ({
                    brand = "Anthem",
                    variant = "primary",
                    size = "small",
                    children,
                    ...props
                }) => {
    const brandTokens = tokens.button;
    const anthemTokens = tokens.Brand;

    const backgroundColor = brandTokens.background[variant]?.default.value || "#000";
    const hoverBackgroundColor = brandTokens.background[variant]?.hover.value;
    const activeBackgroundColor = brandTokens.background[variant]?.press.value;

    const color = brandTokens.text.primary.value || "#FFF";
    const borderRadius = brandTokens.border.borderRadius.value || "22px";

    const padding = {
        small: "8px 30px",
        large: "10px 48px",
    }[size];

    const fontSize = {
        small: brandTokens.font.size.small.value,
        large: brandTokens.font.size.large.single.value,
    }[size];

    const fontWeight = "600";
    const fontFamily = "ElevanceSans-Semibold";

    const buttonStyles = {
        backgroundColor,
        color,
        borderRadius,
        padding,
        fontSize,
        fontWeight,
        fontFamily,
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
    };

    return (
        <button
            style={buttonStyles}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBackgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
            onMouseDown={(e) => (e.currentTarget.style.backgroundColor = activeBackgroundColor)}
            onMouseUp={(e) => (e.currentTarget.style.backgroundColor = hoverBackgroundColor)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
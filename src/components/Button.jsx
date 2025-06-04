// src/components/Button.jsx
import React from "react";
import tokens from "../tokens.json"; // adjust path if your tokens.json lives elsewhere

/**
 * A simple Button that reads its styles from tokens.json.
 *
 * Props:
 *   - variant: "primary" | "secondary"
 *   - size:    "large"   | "small"
 *   - children: any text or nodes
 */
const Button = ({
                    variant = "primary",
                    size = "large",
                    children,
                    ...props
                }) => {
    // Pull token values for the chosen variant:
    const variantTokens = tokens.button[variant] || tokens.button.primary;

    // Fallback if someone passes an unknown variant:
    const backgroundColor = variantTokens.backgroundColor.value;
    const color = variantTokens.textColor.value;
    const borderRadius = variantTokens.borderRadius.value;
    const padding = variantTokens.padding.value;
    const fontSize = variantTokens.fontSize.value;
    const fontWeight = variantTokens.fontWeight.value;

    // If you want to honor "size" prop separately, you could override
    // fontSize or padding here based on "large" vs "small". For now, we'll
    // keep size logic minimal—just change padding slightly:
    let sizeOverride = {};
    if (size === "small") {
        // e.g. reduce overall padding by half
        // (you can also add separate tokens for size if desired)
        sizeOverride = {
            padding: "4px 8px",
            fontSize: "12px",
        };
    }

    return (
        <button
            style={{
                backgroundColor,
                color,
                borderRadius,
                padding,
                fontSize,
                fontWeight,
                border: "none",
                cursor: "pointer",
                ...sizeOverride,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

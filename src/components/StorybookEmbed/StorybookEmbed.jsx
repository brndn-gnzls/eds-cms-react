// src/components/StorybookEmbed/StorybookEmbed.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * StorybookEmbed
 *
 * Given a Storybook “componentName” (e.g. "Button") and an optional “story” (e.g. "primary"),
 * this builds an iframe URL that points to the full Storybook UI (so you see Controls).
 *
 * Assumptions:
 *   • Your Storybook is running at http://localhost:6006
 *   • Your stories have title: "Components/Button" (→ storyId = "components-button--primary")
 *
 * Props:
 *   - componentName: e.g. "Button"
 *   - story:         e.g. "primary" | "secondary" (defaults to "primary")
 *   - height:        iframe height in pixels (defaults to 500)
 */
const StorybookEmbed = ({ componentName, story = "primary", height = 500 }) => {
    // 1) Build storyId. Storybook lowercases group + name + variant:
    //     "Components/Button" + "primary" → "components-button--primary"
    const group   = "components";
    const comp    = componentName.toLowerCase();
    const variant = story.toLowerCase();
    const storyId = `${group}-${comp}--${variant}`;

    // 2) Use ?path=/story/... so that Storybook shows full UI (including Controls)
    const srcUrl = `http://localhost:6006/?path=/story/${storyId}`;

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                overflow: "hidden",
                margin: "1rem 0",
            }}
        >
            <iframe
                title={`storybook-${componentName}-${story}`}
                src={srcUrl}
                height={height}
                width="100%"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};

StorybookEmbed.propTypes = {
    componentName: PropTypes.string.isRequired,
    story:         PropTypes.oneOf(["primary", "secondary"]),
    height:        PropTypes.number,
};

export default StorybookEmbed;

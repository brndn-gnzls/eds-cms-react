import React from "react";
import PropTypes from "prop-types";

const StorybookEmbed = ({ componentName, story = "primary", height = 500 }) => {
    const group   = "components";
    const comp    = componentName.toLowerCase();
    const variant = story.toLowerCase();
    const storyId = `${group}-${comp}--${variant}`;

    const srcUrl = `https://dev.eds.dfe.awsdns.internal.das/storybook/?path=/story/${storyId}`;

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

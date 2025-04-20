import React from "react";

export default function StorybookEmbed({ componentName = "Button" }) {
    // A simple mapping from “Button” to the actual story path
    // This might be a dictionary if you have many components:
    const storyPathMap = {
        "Button": "example-button--primary",
    };

    // Derive a path from the map
    const storyPath = storyPathMap[componentName] || "example-button--primary";

    // Construct the final URL to your local or deployed Storybook
    // E.g. local dev => http://localhost:6006/?path=/story/<storyPath>
    const storybookUrl = `http://localhost:6006/?path=/story/${storyPath}`;

    return (
        <iframe
            title={`Storybook for ${componentName}`}
            src={storybookUrl}
            style={{
                border: "1px solid #ddd",
                width: "100%",
                height: "500px",
            }}
        />
    );
}
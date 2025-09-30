import React from "react";
import PropTypes from "prop-types";

/** Build a Storybook story ID: <group>-<component>--<variant>
 * Mirrors Storybook's id generation (lowercase, spaces/underscores to dashes).
 * If your actual IDs differ, pass `idOverride` explicitly.
 */
const toKebab = (s) =>
    String(s)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")       // non-alphanum → -
        .replace(/^-+|-+$/g, "");          // trim dashes

const StorybookEmbed = ({
                            componentName,
                            story = "default",                 // most stories export `Default`
                            height = 500,
                            group = "components",              // matches `title: 'Components/<Comp>'`
                            idOverride,                        // optional: pass a full id if needed
                            baseUrl = "https://172.17.0.1:5500/storybook", // keep your domain here
                        }) => {
    const comp    = toKebab(componentName);
    const variant = toKebab(story);
    const storyId = idOverride || `${toKebab(group)}-${comp}--${variant}`;

    // /iframe.html?viewMode=story&id=<storyId>
    const srcUrl = `${baseUrl}/iframe.html?viewMode=story&id=${storyId}`;

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
                title={`storybook-${componentName}-${variant}`}
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
    componentName: PropTypes.string.isRequired,           // e.g., "Button"
    story:         PropTypes.string,                      // e.g., "default", "primary"
    height:        PropTypes.number,
    group:         PropTypes.string,                      // e.g., "components"
    idOverride:    PropTypes.string,                      // e.g., "components-button--primary"
    baseUrl:       PropTypes.string,                      // e.g., "https://<YOUR-DOMAIN>/storybook"
};

export default StorybookEmbed;

// import React from "react";
// import PropTypes from "prop-types";
//
// const StorybookEmbed = ({ componentName, story = "primary", height = 500 }) => {
//     const group   = "components";
//     const comp    = componentName.toLowerCase();
//     const variant = story.toLowerCase();
//     const storyId = `${group}-${comp}--${variant}`;
//
//     const srcUrl = `https://dev.eds.dfe.awsdns.internal.das/storybook/?path=/story/${storyId}`;
//
//     return (
//         <div
//             style={{
//                 border: "1px solid #ddd",
//                 borderRadius: 4,
//                 overflow: "hidden",
//                 margin: "1rem 0",
//             }}
//         >
//             <iframe
//                 title={`storybook-${componentName}-${story}`}
//                 src={srcUrl}
//                 height={height}
//                 width="100%"
//                 frameBorder="0"
//                 allowFullScreen
//             />
//         </div>
//     );
// };
//
// StorybookEmbed.propTypes = {
//     componentName: PropTypes.string.isRequired,
//     story:         PropTypes.oneOf(["primary", "secondary"]),
//     height:        PropTypes.number,
// };
//
// export default StorybookEmbed;

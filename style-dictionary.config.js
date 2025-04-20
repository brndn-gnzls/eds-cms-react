// style-dictionary.config.js

// 1) Define our custom filters for each brand, checking the first path segment
const filterAnthem = (token) => token.path[0] === "Brand/Anthem";
const filterWellpoint = (token) => token.path[0] === "Brand/Wellpoint";
const filterHealthyBlue = (token) => token.path[0] === "Brand/HealthyBlue";

module.exports = {
    // 2) Source the single big tokens JSON
    source: ["tokens/tokens.json"],

    // 3) Define multiple "platforms" (aka build targets)
    platforms: {
        anthemCss: {
            // A set of transforms from the built-in "css" group
            transformGroup: "css",
            buildPath: "dist/", // you can change this to any folder you like
            files: [
                {
                    destination: "anthem-tokens.css",
                    format: "css/variables",
                    filter: filterAnthem,
                },
            ],
        },

        wellpointCss: {
            transformGroup: "css",
            buildPath: "dist/",
            files: [
                {
                    destination: "wellpoint-tokens.css",
                    format: "css/variables",
                    filter: filterWellpoint,
                },
            ],
        },

        healthyBlueCss: {
            transformGroup: "css",
            buildPath: "dist/",
            files: [
                {
                    destination: "healthyblue-tokens.css",
                    format: "css/variables",
                    filter: filterHealthyBlue,
                },
            ],
        },

        // For storybook add-ons or your own usage, we can produce a single
        // flattened JSON that includes all tokens (no filter).
        flattenedJSON: {
            transformGroup: "js", // "js" or "js/es6", etc. to produce JSON
            buildPath: "dist/",
            files: [
                {
                    destination: "tokens-flat.json",
                    format: "json/flat",
                    // no filter => includes all tokens
                },
            ],
        },
    },
};

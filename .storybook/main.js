

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/components/**/*.stories.@(js|jsx)"],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ]
};
export default config;
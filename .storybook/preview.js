/** @type { import('@storybook/react-webpack5').Preview } */
import './preview.css';

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            disableSaveFromUI: true
        },
    },
    options: {
        storySort: {
            order: ['Introduction', 'Components', 'Pages'],
        },
        enableShortcuts: false,
    },
    controls: { expanded: true },
    actions: {disable: true},
    globals: {
        disablePersistence: true
    },
};

export default preview;
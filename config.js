const StyleDictionary = require('style-dictionary');
const _ = require('lodash');

const globalParser = (obj) => {
    const newObj = {};

    if (obj.sizing) {
        newObj.Primitives = { Value: {} };

        newObj.Primitives.Value.sizing = _.omit(obj.sizing, 'borderRadius');
        newObj.Primitives.Value.borderRadius = obj.sizing.borderRadius;
    }

    if (obj.fontSize || obj.lineHeight) {
        newObj.Primitives = newObj.Primitives || { Value: {} };

        if (obj.fontSize) {
            newObj.Primitives.Value.fontSize = obj.fontSize;
        }

        if (obj.lineHeight) {
            newObj.Primitives.Value.lineHeight = obj.lineHeight;
        }
    }

    if (obj.spacing) {
        newObj.Primitives = newObj.Primitives || { Value: {} };

        newObj.Primitives.Value.spacing = obj.spacing;
    }

    if (obj.effect && obj.effect.opacity) {
        newObj.Primitives = newObj.Primitives || { Value: {} };

        newObj.Primitives.Value.opacity = obj.effect.opacity;
    }

    if (obj.color) {
        newObj.Primitives = newObj.Primitives || { Value: {} };

        newObj.Primitives.Value.colors = _.mapKeys(obj.color, (value, key) => (key === 'gray' ? 'grays' : key));
    }

    return newObj;
};

const anthemPrimitivesParser = (obj) => ({
    Primitives: { Value: { Anthem: obj } }
});

const buttonParser = (obj) => ({
    Primitives: { Value: { button: obj.button } }
});

const buttonGroupParser = (obj) => ({
    Primitives: { Value: { buttonGroup: obj.buttonGroup } }
});

const textFieldParser = (obj) => ({
    Primitives: { Value: { textField: obj.textField } }
});

const containerParser = (obj) => ({
    Primitives: {
        Value: {
            container: {
                minWidth: obj["Primitives/Value/container/minWidth"],
                maxWidth: obj["Primitives/Value/container/maxWidth"]
            }
        }
    }
});

const sectionHeaderParser = (obj) => ({
    Primitives: { Value: { sectionHeader: obj.sectionHeader } }
});

const slideInParser = (obj) => ({
    Primitives: { Value: { slideIn: obj.slideIn } }
});


const progressBarParser = (obj) => ({
    Primitives: { Value: { progressBar: obj.progressBar } }
});

const tooltipParser = (obj) => ({
    Primitives: {
        Value: {
            tooltip: {
                minWidth: obj.tooltip.width.min,
                maxWidth: obj.tooltip.width.max
            }
        }
    }
});

const leftNavParser = (obj) => ({
    Primitives: { Value: { leftNav: obj.leftNav } }
});

const pageHeaderParser = (obj) => ({
    Primitives: { Value: { pageHeader: obj.pageHeader } }
});

const healthyBluePrimitivesParser = (obj) => ({
    Primitives: { Value: { HealthyBlue: obj } }
});

const StyleDictionaryConfig = {
    parsers: [
        {
            pattern: /globals\/(sizing|typography|spacing|effects|colors)\.json$/,
            parse: ({ contents }) => globalParser(JSON.parse(contents))
        },
        {
            pattern: /primitives\/anthem\.json$/,
            parse: ({ contents }) => anthemPrimitivesParser(JSON.parse(contents))
        },
        {
            pattern: /components\/button\.json$/,
            parse: ({ contents }) => buttonParser(JSON.parse(contents))
        },
        {
            pattern: /components\/text-field\.json$/,
            parse: ({ contents }) => textFieldParser(JSON.parse(contents))
        },
        {
            pattern: /components\/container\.json$/,
            parse: ({ contents }) => containerParser(JSON.parse(contents))
        },
        {
            pattern: /components\/section-header\.json$/,
            parse: ({ contents }) => sectionHeaderParser(JSON.parse(contents))
        },
        {
            pattern: /components\/progress-bar\.json$/,
            parse: ({ contents }) => progressBarParser(JSON.parse(contents))
        },
        {
            pattern: /components\/tooltip\.json$/,
            parse: ({ contents }) => tooltipParser(JSON.parse(contents))
        },
        {
            pattern: /components\/button-group\.json$/,
            parse: ({ contents }) => buttonGroupParser(JSON.parse(contents))
        },
        {
            pattern: /components\/page-header\.json$/,
            parse: ({ contents }) => pageHeaderParser(JSON.parse(contents))
        },
        {
            pattern: /components\/slide-in\.json$/,
            parse: ({ contents }) => slideInParser(JSON.parse(contents))
        },
        {
            pattern: /components\/left-nav\.json$/,
            parse: ({ contents }) => leftNavParser(JSON.parse(contents))
        },
        {
            pattern: /primitives\/healthyblue\.json$/,
            parse: ({ contents }) => healthyBluePrimitivesParser(JSON.parse(contents))
        },

    ],
    source: [
        'src/tokens/brand/anthem/**/*.json',
        'src/tokens/brand/healthyblue/**/*.json',
        'src/tokens/globals/**/*.json',
        'src/tokens/components/**/*.json',
        'src/tokens/semantic/anthem.json',
        'src/tokens/semantic/healthyblue.json',
        'src/tokens/primitives/anthem.json',
        'src/tokens/primitives/healthyblue.json'
    ],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'token_build/css/',
            files: [{ destination: 'variables.css', format: 'css/variables' }]
        },
        js: {
            transformGroup: 'js',
            buildPath: 'token_build/js/',
            files: [{ destination: 'tokens.js', format: 'javascript/module' }]
        }
    }
};

module.exports = StyleDictionary.extend(StyleDictionaryConfig);
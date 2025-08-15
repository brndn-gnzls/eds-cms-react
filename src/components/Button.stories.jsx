/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './Button';

/* Webpack + raw-loader: brand CSS as strings */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/button.css';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/button.css';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/button.css';

/** Map the Storybook control value -> brand assets + canonical token prefix */
const BRAND_MAP = {
    anthem: {
        css: anthemTokens,
        canonicalPrefix: '--semantic-anthem-',
    },
    wellpoint: {
        css: wellpointTokens,
        canonicalPrefix: '--semantic-wellpoint-',
    },
    healthyblue: {
        css: healthyblueTokens,
        canonicalPrefix: '--semantic-healthy-blue-',
    },
};

/** Alias our component uses in Task 1 */
const ALIAS_ROW = {
    label: 'Surface Primary (Button BG)',
    aliasVar: '--semantic-surface-primary',
    canonicalSuffix: 'surface-primary',
};

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        controls: { include: ['brand', 'variant', 'size', 'disabled', 'children'] },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
        vitest: { disable: true },
        chromatic: { disableSnapshot: true },
        options: { enableShortcuts: false, showPanel: true },
        interactions: { disable: true },
    },
    argTypes: {
        brand: {
            control: { type: 'select' },
            options: ['anthem', 'healthyblue', 'wellpoint'],
        },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'secondaryWhite', 'ghost'],
        },
        size: { control: { type: 'select' }, options: ['small', 'large'] },
        disabled: { control: 'boolean' },
        children: { control: 'text' },
    },
};

const useBrandCss = (brandKey) => {
    const [ready, setReady] = useState(false);
    const brand = BRAND_MAP[brandKey] ?? BRAND_MAP.anthem;
    const canonicalVar = `${brand.canonicalPrefix}${ALIAS_ROW.canonicalSuffix}`;

    useEffect(() => {
        setReady(false);

        let styleTag = document.getElementById('dynamic-brand-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-brand-styles';
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = brand.css;

        // Let the browser apply styles before we read computed values
        const t = setTimeout(() => setReady(true), 60);
        return () => clearTimeout(t);
    }, [brandKey, brand.css]);

    return { ready, canonicalVar, brandKey };
};

const TokenTable = ({ aliasVar, canonicalVar, brandKey, ready }) => {
    // Recompute when brand changes AND when styles have applied
    const value = useMemo(() => {
        if (!ready) return '…';
        const v = getComputedStyle(document.documentElement).getPropertyValue(aliasVar).trim();
        return v || 'N/A';
    }, [aliasVar, brandKey, ready]);

    const swatchStyle = {
        width: 24,
        height: 24,
        border: '1px solid #ccc',
        background: `var(${aliasVar})`,
    };

    return (
        <div style={{ marginTop: 24 }}>
            <h3>🎨 Design Tokens (Rendered Values)</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: 8 }}>Token</th>
                    <th style={{ padding: 8 }}>Alias (Component uses)</th>
                    <th style={{ padding: 8 }}>Resolves to (Brand-scoped)</th>
                    <th style={{ padding: 8 }}>Computed</th>
                    <th style={{ padding: 8 }}>Preview</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{ padding: 8 }}>{ALIAS_ROW.label}</td>
                    <td style={{ padding: 8 }}><code>{ALIAS_ROW.aliasVar}</code></td>
                    <td style={{ padding: 8 }}><code>{canonicalVar}</code></td>
                    <td style={{ padding: 8 }}>{value}</td>
                    <td style={{ padding: 8 }}><div style={swatchStyle} /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

const Template = (args) => {
    const { ready, canonicalVar, brandKey } = useBrandCss(args.brand);

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Button {...args} />
            {ready && (
                <TokenTable
                    aliasVar={ALIAS_ROW.aliasVar}
                    canonicalVar={canonicalVar}
                    brandKey={brandKey}
                    ready={ready}
                />
            )}
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    brand: 'anthem',
    variant: 'primary',
    size: 'large',
    disabled: false,
    children: 'Click Me',
};
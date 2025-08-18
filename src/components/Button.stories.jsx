/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './Button';

/* Webpack + raw-loader: brand CSS as strings (single brand injected at a time) */
import anthemTokens from '!!raw-loader!../design-tokens/anthem/button.css?v=dev1';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/button.css?v=dev1';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/button.css?v=dev1';

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

/** Aliases our component uses (brand‑agnostic). These resolve on the button element via .btn--{brand}. */
const TOKEN_ROWS = [
    // Surfaces (backgrounds)
    { label: 'Surface / Primary', aliasVar: '--semantic-surface-primary', canonicalSuffix: 'surface-primary' },
    { label: 'Surface / Secondary', aliasVar: '--semantic-surface-secondary', canonicalSuffix: 'surface-secondary' },
    { label: 'Surface / Press', aliasVar: '--semantic-surface-press', canonicalSuffix: 'surface-press' },
    { label: 'Surface / White', aliasVar: '--semantic-surface-white', canonicalSuffix: 'surface-white' },
    { label: 'Surface / Subdued', aliasVar: '--semantic-surface-subdued', canonicalSuffix: 'surface-subdued' },

    // Borders
    { label: 'Border / Primary', aliasVar: '--semantic-border-primary', canonicalSuffix: 'border-primary' },
    { label: 'Border / White', aliasVar: '--semantic-border-white', canonicalSuffix: 'border-white' },

    // Text
    { label: 'Text / White', aliasVar: '--semantic-text-white', canonicalSuffix: 'text-white' },
    { label: 'Text / Primary', aliasVar: '--semantic-text-primary', canonicalSuffix: 'text-primary' },

    // Icons
    { label: 'Icon / White', aliasVar: '--semantic-icon-white', canonicalSuffix: 'icon-white' },
    { label: 'Icon / Primary', aliasVar: '--semantic-icon-primary', canonicalSuffix: 'icon-primary' },
];

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

/** Inject one brand stylesheet into the preview iframe at a time (keeps things deterministic). */
const useBrandCss = (brandKey) => {
    const [ready, setReady] = useState(false);
    const brand = BRAND_MAP[brandKey] ?? BRAND_MAP.anthem;

    useEffect(() => {
        setReady(false);
        let styleTag = document.getElementById('dynamic-brand-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-brand-styles';
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = brand.css;

        const t = setTimeout(() => setReady(true), 60);
        return () => clearTimeout(t);
    }, [brandKey, brand.css]);

    return { ready, canonicalPrefix: brand.canonicalPrefix, brandKey };
};

/** Read resolved values from the *button element* (where the aliases are defined),
 *  then paint the swatch with the resolved color (hex/rgb) so it shows outside the button scope.
 */
const TokenTable = ({ btnEl, canonicalPrefix, ready, brandKey }) => {
    const rows = useMemo(() => {
        if (!ready || !btnEl) {
            return TOKEN_ROWS.map(r => ({ ...r, value: '…', canonicalVar: `${canonicalPrefix}${r.canonicalSuffix}` }));
        }
        const cs = getComputedStyle(btnEl);
        return TOKEN_ROWS.map(r => {
            const value = cs.getPropertyValue(r.aliasVar).trim() || 'N/A';
            const canonicalVar = `${canonicalPrefix}${r.canonicalSuffix}`;
            return { ...r, value, canonicalVar };
        });
    }, [btnEl, ready, canonicalPrefix, brandKey]);

    return (
        <div style={{ marginTop: 24 }}>
            <h3>🎨 Design Tokens (Rendered Values)</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: 8 }}>Token</th>
                    <th style={{ padding: 8 }}>Alias (Component uses)</th>
                    <th style={{ padding: 8 }}>Resolves to (Brand-scoped)</th>
                    <th style={{ padding: 8 }}>Computed (from button)</th>
                    <th style={{ padding: 8 }}>Preview</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(row => (
                    <tr key={row.aliasVar}>
                        <td style={{ padding: 8 }}>{row.label}</td>
                        <td style={{ padding: 8 }}><code>{row.aliasVar}</code></td>
                        <td style={{ padding: 8 }}><code>{row.canonicalVar}</code></td>
                        <td style={{ padding: 8 }}>{row.value}</td>
                        <td style={{ padding: 8 }}>
                            <div style={{
                                width: 24,
                                height: 24,
                                border: '1px solid #ccc',
                                background: (row.value && row.value !== 'N/A' && row.value !== '…') ? row.value : 'transparent',
                            }} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const Template = (args) => {
    const { ready, canonicalPrefix, brandKey } = useBrandCss(args.brand);

    // Find the actual button element after render in the Canvas iframe
    const [btnEl, setBtnEl] = useState(null);
    useEffect(() => {
        const id = setTimeout(() => {
            const el = document.querySelector('.btn');
            setBtnEl(el || null);
        }, 0);
        return () => clearTimeout(id);
    }, [ready, args.brand, args.variant, args.size, args.disabled]);

    return (
        <div style={{ fontFamily: 'Arial', padding: 20 }}>
            <Button {...args} />
            {ready && (
                <TokenTable
                    btnEl={btnEl}
                    canonicalPrefix={canonicalPrefix}
                    ready={ready}
                    brandKey={brandKey}
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
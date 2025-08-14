/* eslint import/no-webpack-loader-syntax: off */

import React, { useEffect, useState } from 'react';
import { Button } from './Button';

import anthemTokens from '!!raw-loader!../design-tokens/anthem/button.css';
import healthyblueTokens from '!!raw-loader!../design-tokens/healthyblue/button.css';
import wellpointTokens from '!!raw-loader!../design-tokens/wellpoint/button.css';

const brandTokenMap = {
    anthem: anthemTokens,
    healthyblue: healthyblueTokens,
    wellpoint: wellpointTokens,
};

const tokenDefinitions = [
    { name: 'Disabled Height', var: '--brand-button-disabled', type: 'size' },
    { name: 'Font Size Small', var: '--brand-button-font-size-small', type: 'size' },
    { name: 'Font Size Large', var: '--brand-button-font-size-large-single', type: 'size' },
    { name: 'Font Weight Small', var: '--brand-button-font-weight-small', type: 'fontWeight' },
    { name: 'Primary Background', var: '--brand-button-background-primary-default', type: 'color' },
    { name: 'Primary Text', var: '--brand-button-text-primary-default', type: 'color' },
    { name: 'Secondary Background', var: '--brand-button-background-secondary-hover', type: 'color' },
    { name: 'Secondary Text', var: '--brand-button-text-secondary-default', type: 'color' },
    { name: 'Ghost Text', var: '--brand-button-text-ghost-default', type: 'color' },
    { name: 'Disabled Background', var: '--brand-button-background-primary-disabled', type: 'color' },
    { name: 'Disabled Text', var: '--brand-button-text-primary-disabled', type: 'color' },
    { name: 'Button Border Size', var: '--brand-button-border-size', type: 'size' },
    { name: 'Button Height Large', var: '--brand-button-height-large', type: 'size' },
    { name: 'Button Height Small', var: '--brand-button-height-small', type: 'size' },
    { name: 'Padding Horizontal Large', var: '--brand-button-padding-horizontal-large', type: 'size' },
    { name: 'Padding Vertical Large', var: '--brand-button-padding-vertical-large', type: 'size' },
];

export default {
    title: 'Components/Button',
    component: Button,
    parameters: {
        controls: {
            include: ['brand', 'variant', 'size', 'disabled', 'children'],
        },
        actions: { disable: true },
        a11y: { disable: true },
        docs: { disable: true },
        vitest: { disable: true },
        chromatic: { disableSnapshot: true },
        options: {
            enableShortcuts: false,
            showPanel: true,
        },
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

const Template = (args) => {
    const [cssLoaded, setCssLoaded] = useState(false);
    const tokens = brandTokenMap[args.brand] || anthemTokens;

    useEffect(() => {
        let styleElement = document.getElementById('dynamic-brand-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-brand-styles';
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = tokens;

        const timeout = setTimeout(() => setCssLoaded(true), 50);
        return () => clearTimeout(timeout);
    }, [args.brand, tokens]);

    return (
        <div style={{ fontFamily: 'Arial', padding: '20px' }}>
            <Button {...args} />
            {cssLoaded && (
                <div style={{ marginTop: '32px' }}>
                    <h3>🎨 Design Tokens (Rendered Values)</h3>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '8px' }}>Token</th>
                            <th style={{ padding: '8px' }}>CSS Variable</th>
                            <th style={{ padding: '8px' }}>Preview</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tokenDefinitions.map(token => (
                            <tr key={token.var}>
                                <td style={{ padding: '8px' }}>{token.name}</td>
                                <td style={{ padding: '8px' }}><code>{token.var}</code></td>
                                <td style={{ padding: '8px' }}>
                                    {token.type === 'color' && (
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: `var(${token.var})`,
                                            border: '1px solid #ccc'
                                        }} />
                                    )}
                                    {token.type === 'fontWeight' && (
                                        <span style={{ fontWeight: `var(${token.var})` }}>
                        Aa (Semibold)
                      </span>
                                    )}
                                    {token.type === 'size' && (
                                        <span style={{
                                            display: 'inline-block',
                                            background: '#f9f9f9',
                                            border: '1px solid #ddd',
                                            padding: '2px 4px',
                                            borderRadius: '4px'
                                        }}>
                        {getComputedStyle(document.documentElement)
                            .getPropertyValue(token.var).trim() || 'N/A'}
                      </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
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
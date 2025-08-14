import React from 'react';
import './Button.css';

// Static CSS imports to avoid dynamic injection issues
import '../design-tokens/anthem/button.css';
import '../design-tokens/healthyblue/button.css';
import '../design-tokens/wellpoint/button.css';

export const Button = ({
                           variant = 'primary',
                           size = 'large',
                           disabled = false,
                           children,
                           brand = 'anthem'
                       }) => {
    const classNames = [
        'btn',
        `btn--${brand}`,
        `btn--${variant}`,
        size === 'large' ? 'btn--large' : 'btn--small',
        disabled && 'btn--disabled'
    ];

    return (
        <button className={classNames.join(' ')} disabled={disabled}>
            {children}
        </button>
    );
};
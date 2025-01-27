// src/components/ComponentTabs/ComponentTabs.js

import React, { useState } from "react";
import styles from "./ComponentTabs.module.css";

/**
 * We replicate the pinned logic from DevTabs, but we assume:
 * - bannerHeading
 * - bannerBody
 * - tabsData => [{ label, blocks }, ...] e.g. Overview, Usage, Accessibility
 *
 * The difference: we do a white banner, no background image, and tab labels are from tabsData.
 */
const ComponentTabs = ({ bannerHeading, bannerBody, tabsData = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveIndex(index);
    };

    // The blocks for the currently active tab
    const currentTabBlocks = tabsData[activeIndex]?.blocks || [];

    return (
        <div className={styles.componentTabsContainer}>
            {/* pinned area => white banner + tab bar */}
            <div className={styles.pinnedArea}>
                {/* White banner -> 300px high, marginLeft 300, width 827, etc if you want the same as dev */}
                <div className={styles.banner}>
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>

                {/* The tab bar => 52px, pinned below banner */}
                <div className={styles.tabBar}>
                    {tabsData.map((tab, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleTabClick(idx)}
                                className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* The scrollable tab content area */}
            <div className={styles.tabContent}>
                {currentTabBlocks.map((block, idx) => (
                    <div key={idx} style={{ marginBottom: "16px" }}>
                        {renderBlock(block)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentTabs;

/** Renders each block. You can do the same pattern as DevTabs. */
function renderBlock(block) {
    switch (block.type) {
        case "h2":
            return <h2>{block.content}</h2>;
        case "p":
            return <p>{block.content}</p>;
        // etc for pBold, pItalic, spacing, hr, etc.
        default:
            return <p>{block.content || "[Unknown block]"}</p>;
    }
}

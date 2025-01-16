import React, { useState } from "react";
import styles from "./DevTabs.module.css";

const TABS = [
    { id: 0, label: "Get Started" },
    { id: 1, label: "Developer Resources" },
    { id: 2, label: "FAQs" },
];

const DevTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    // Dummy content for each tab
    let tabContent;
    if (activeTab === 0) {
        tabContent = (
            <p>
                [Get Started] This is dummy text for the "Get Started" tab.
                You can replace it with actual instructions or content from Strapi.
            </p>
        );
    } else if (activeTab === 1) {
        tabContent = (
            <p>
                [Developer Resources] This is dummy text for developer resources.
                You can list useful docs, code examples, or API references here.
            </p>
        );
    } else {
        tabContent = (
            <p>
                [FAQs] Frequently Asked Questions about the eDS for development.
                Provide Q&A or link to a more comprehensive FAQ page.
            </p>
        );
    }

    return (
        <div className={styles.devTabsWrapper}>
            {/* The sticky tab bar */}
            <div className={styles.tabBar}>
                {TABS.map((tab) => {
                    // If tab is the active one, apply the "selected" state
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* The content area under the tabs */}
            <div className={styles.tabContent}>
                {tabContent}
            </div>
        </div>
    );
};

export default DevTabs;

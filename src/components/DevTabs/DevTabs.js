
import React, { useState } from "react";
import styles from "./DevTabs.module.css";

const TABS = [
    { id: 0, label: "Get Started" },
    { id: 1, label: "Developer Resources" },
    { id: 2, label: "FAQs" },
];

const DevTabs = ({ bannerHeading, bannerBody, bannerImage }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const getStartedContent = (
        <>
            <p>
                [Get Started] Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
            <p>
                Add more paragraphs. This text should scroll inside the tab content area,
                while the banner + tab bar remain pinned.
            </p>
        </>
    );

    const devResourcesContent = (
        <>
            <p>
                [Developer Resources] List code examples, references, or best practices...
            </p>
            <p>
                Another paragraph, etc. Enough text to ensure a real scroll.
            </p>
        </>
    );

    const faqsContent = (
        <>
            <p>
                [FAQs] Frequently Asked Questions about eDS development...
            </p>
            <p>
                Another paragraph, ensuring we can see a scroll.
            </p>
        </>
    );

    let tabContent;
    if (activeTab === 0) tabContent = getStartedContent;
    else if (activeTab === 1) tabContent = devResourcesContent;
    else tabContent = faqsContent;

    return (
        <div className={styles.devTabsContainer}>
            {/* The pinned block => Banner (300px) + Tab Bar (52px) = 352px total */}
            <div className={styles.pinnedArea}>
                <div
                    className={styles.banner}
                    style={{ backgroundImage: `url("${bannerImage}")` }}
                >
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>

                <div className={styles.tabBar}>
                    {TABS.map((tab) => {
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
            </div>

            <div className={styles.tabContent}>
                {tabContent}
            </div>
        </div>
    );
};

export default DevTabs;

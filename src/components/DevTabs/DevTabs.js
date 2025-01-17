// src/components/DevTabs/DevTabs.js

import React, { useState } from "react";
import styles from "./DevTabs.module.css";
import GettingHelpInternal from "../GettingHelpInteral/GettingHelpInternal";
import LargeAccordion from "../LargeAccordion/LargeAccordion";

const dummyData = {
    getStarted: {
        sections: [
            {
                type: "h2",
                content: "Get Started",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
Nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.`,
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "h4",
                content: "Repository implementation",
            },
            {
                type: "pBold",
                content: "This implementation is recommended for...",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
Suspendisse potenti. Phasellus volutpat cursus erat et ultrices.
Aliquam non hendrerit lacus, sed lobortis magna.`,
            },
            {
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "h4",
                content: "NPM implementation",
            },
            {
                type: "pBold",
                content: "This implementation is recommended for...",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Curabitur at odio leo. Nam euismod, tellus sit amet. `,
            },
            {
                type: "p",
                content: `Mauris malesuada sapien a lorem ultricies varius. 
Pellentesque habitant morbi tristique senectus. 
Donec mattis diam nec magna tincidunt. 
Suspendisse sollicitudin sagittis nisi eu elementum. 
Mauris faucibus egestas ligula in cursus. 
Sed sit amet tincidunt leo.`,
            },
            {
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                type: "spacing",
                height: 52,
            },
            {
                type: "h4",
                content: "Project Setup",
            },
            {
                type: "pBold",
                content: "Checkout our step by step guide....",
            },
            {
                type: "img",
                src: "https://placehold.co/650x370",
            },
            {
                type: "pItalicSmall",
                content: `Lorem ipsum dolor sit amet, consectetur. 
Sed do eiusmod tempor incididunt ut labore.`,
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "hr",
                color: "#eeeeee",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "h2",
                content: "Design Tokens",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Vestibulum placerat tempus purus, id vehicula mi ultricies in. 
Aliquam gravida dui neque, id auctor nisi finibus vel. 
Morbi eleifend commodo diam, in sodales odio pharetra id. 
Sed euismod metus eu finibus tristique.`,
            },
            {
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                type: "h4",
                content: "How does this apply in code.",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed imperdiet mollis ante, sed porttitor metus congue sed. 
Donec sollicitudin arcu at odio vulputate, in porttitor neque gravida.`,
            },
            {
                type: "p",
                content: `Aenean nisl diam, faucibus nec consequat at, fringilla non metus. 
Mauris vulputate varius sapien et maximus. 
Nullam aliquam, nunc vel imperdiet ultricies, erat augue blandit nulla.`,
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "hr",
                color: "#eeeeee",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "h2",
                content: "Get Started",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Nunc dapibus, metus a faucibus ultrices, est tellus rutrum sem, 
ac consectetur sapien odio non libero. 
Cras fringilla metus vel purus sagittis finibus. 
Suspendisse neque metus, aliquet quis venenatis ut, mollis at turpis.`,
            },
            {
                type: "img",
                src: "https://placehold.co/650x370",
            },
            {
                type: "pItalicSmall",
                content: `Lorem ipsum dolor sit amet, adipiscing elit. 
Aliquam tincidunt arcu sem.`,
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "hr",
                color: "#eeeeee",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "gettingHelpInternal",
            },
        ],
    },

    developerResources: {
        sections: [
            {
                type: "h2",
                content: "Developer Resources",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
Nisi ut aliquip ex ea commodo consequat.`,
            },
            {
                type: "spacing",
                height: 24,
            },
            {
                type: "img",
                src: "https://placehold.co/650x280",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "hr",
                color: "#eeeeee",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "gettingHelpInternal",
            },
        ],
    },

    faqs: {
        sections: [
            {
                type: "h2",
                content: "Frequently Asked Questions",
            },
            {
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Quisque ac scelerisque nulla, eu porttitor odio. 
Sed at justo vitae diam fermentum mattis.`,
            },
            {
                type: "spacing",
                height: 44,
            },
            {
                // Our new large accordion
                type: "largeAccordion",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "hr",
                color: "#eeeeee",
            },
            {
                type: "spacing",
                height: 62,
            },
            {
                type: "gettingHelpInternal",
            },
        ],
    },
};

const TABS = [
    { id: 0, label: "Get Started" },
    { id: 1, label: "Developer Resources" },
    { id: 2, label: "FAQs" },
];


/**
 * Renders each block from the dummyData
 */
function renderBlock(block, idx) {
    switch (block.type) {
        case "h2":
            return <h2 key={idx}>{block.content}</h2>;
        case "h4":
            return <h4 key={idx}>{block.content}</h4>;
        case "p":
            return <p key={idx}>{block.content}</p>;
        case "pBold":
            return (
                <p key={idx} style={{ fontWeight: "bold" }}>
                    {block.content}
                </p>
            );
        case "pItalicSmall":
            return (
                <p key={idx} style={{ fontStyle: "italic", fontSize: "14px" }}>
                    {block.content}
                </p>
            );
        case "spacing":
            return <div key={idx} style={{ height: block.height || 16 }} />;
        case "img":
            return (
                <img
                    key={idx}
                    src={block.src}
                    alt="placeholder"
                    style={{ margin: "16px 0" }}
                />
            );
        case "hr":
            return (
                <hr
                    key={idx}
                    style={{
                        border: 0,
                        borderTop: `1px solid ${block.color || "#eeeeee"}`,
                        margin: "16px 0",
                    }}
                />
            );
        case "gettingHelp":
            return (
                <div key={idx}>
                    <GettingHelpInternal />
                </div>
            );
        case "gettingHelpInternal":
            return (
                <div key={idx}>
                    <GettingHelpInternal />
                </div>
            );
        case "largeAccordion":
            return (
                <div key={idx}>
                    <LargeAccordion />
                </div>
            );
        default:
            return <div key={idx}>[Unknown block type: {block.type}]</div>;
    }
}


const DevTabs = ({ bannerHeading, bannerBody, bannerImage }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    let tabContentData;
    if (activeTab === 0) {
        tabContentData = dummyData.getStarted.sections;
    } else if (activeTab === 1) {
        tabContentData = dummyData.developerResources.sections;
    } else {
        tabContentData = dummyData.faqs.sections;
    }

    return (
        <div className={styles.devTabsContainer}>
            {/* Pinned area => Banner (300px) + Tab Bar (52px) = 352px total */}
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

            {/* The scrollable area for each tab's block data */}
            <div className={styles.tabContent}>
                {tabContentData.map((block, idx) => renderBlock(block, idx))}
            </div>
        </div>
    );
};

export default DevTabs;

// src/components/DevTabs/DevTabs.js

import React, { useState } from "react";
import GettingHelpInternal from "../GettingHelpInteral/GettingHelpInternal";
import styles from "./DevTabs.module.css";

// Dummy data structure that mimics a Strapi response for each tab.
// We'll store everything for the "Get Started" tab in a structured format.
const dummyData = {
    getStarted: {
        sections: [
            {
                // h2 heading
                type: "h2",
                content: "Get Started",
            },
            {
                // 5 lines of lorem in <p>
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. 
Nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.`,
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // h4: "Repository implementation"
                type: "h4",
                content: "Repository implementation",
            },
            {
                // "This implementation is recommended for..." (bold)
                type: "pBold",
                content: "This implementation is recommended for...",
            },
            {
                // 5 lines of lorem
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
Suspendisse potenti. Phasellus volutpat cursus erat et ultrices.
Aliquam non hendrerit lacus, sed lobortis magna.`,
            },
            {
                // image
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                // another image
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // "NPM implementation" h4
                type: "h4",
                content: "NPM implementation",
            },
            {
                // bold text
                type: "pBold",
                content: "This implementation is recommended for...",
            },
            {
                // 3 lines
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Curabitur at odio leo. Nam euismod, tellus sit amet. `,
            },
            {
                // 6 lines
                type: "p",
                content: `Mauris malesuada sapien a lorem ultricies varius. 
Pellentesque habitant morbi tristique senectus. 
Donec mattis diam nec magna tincidunt. 
Suspendisse sollicitudin sagittis nisi eu elementum. 
Mauris faucibus egestas ligula in cursus. 
Sed sit amet tincidunt leo.`,
            },
            {
                // image
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                // 52px margin
                type: "spacing",
                height: 52,
            },
            {
                // "Project Setup" h4
                type: "h4",
                content: "Project Setup",
            },
            {
                // bold text
                type: "pBold",
                content: "Checkout our step by step guide....",
            },
            {
                // big image 650x370
                type: "img",
                src: "https://placehold.co/650x370",
            },
            {
                // two lines of 14px italic
                type: "pItalicSmall",
                content: `Lorem ipsum dolor sit amet, consectetur. 
Sed do eiusmod tempor incididunt ut labore.`,
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // 1px line #eeeeee
                type: "hr",
                color: "#eeeeee",
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // h2: "Design Tokens"
                type: "h2",
                content: "Design Tokens",
            },
            {
                // 5 lines
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Vestibulum placerat tempus purus, id vehicula mi ultricies in. 
Aliquam gravida dui neque, id auctor nisi finibus vel. 
Morbi eleifend commodo diam, in sodales odio pharetra id. 
Sed euismod metus eu finibus tristique.`,
            },
            {
                // image
                type: "img",
                src: "https://placehold.co/650x58",
            },
            {
                // h4: "How does this apply in code."
                type: "h4",
                content: "How does this apply in code.",
            },
            {
                // 3 lines
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed imperdiet mollis ante, sed porttitor metus congue sed. 
Donec sollicitudin arcu at odio vulputate, in porttitor neque gravida.`,
            },
            {
                // 3 lines
                type: "p",
                content: `Aenean nisl diam, faucibus nec consequat at, fringilla non metus. 
Mauris vulputate varius sapien et maximus. 
Nullam aliquam, nunc vel imperdiet ultricies, erat augue blandit nulla.`,
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // 1px line
                type: "hr",
                color: "#eeeeee",
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // h2
                type: "h2",
                content: "Get Started",
            },
            {
                // 5 lines
                type: "p",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Nunc dapibus, metus a faucibus ultrices, est tellus rutrum sem, 
ac consectetur sapien odio non libero. 
Cras fringilla metus vel purus sagittis finibus. 
Suspendisse neque metus, aliquet quis venenatis ut, mollis at turpis.`,
            },
            {
                // image 650x370
                type: "img",
                src: "https://placehold.co/650x370",
            },
            {
                // two lines 14px italic
                type: "pItalicSmall",
                content: `Lorem ipsum dolor sit amet, adipiscing elit. 
Aliquam tincidunt arcu sem.`,
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // 1px line #eeeeee
                type: "hr",
                color: "#eeeeee",
            },
            {
                // 62px margin
                type: "spacing",
                height: 62,
            },
            {
                // <GettingHelp /> placeholder
                type: "gettingHelp",
            },
        ],
    },

    developerResources: {
        // We'll fill this later
    },
    faqs: {
        // We'll fill this later
    },
};

const DevTabs = ({ bannerHeading, bannerBody, bannerImage }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    // We assume getStarted is the data for tab 0, devResources tab 1, faqs tab 2
    let tabContentData;
    if (activeTab === 0) {
        tabContentData = dummyData.getStarted.sections;
    } else if (activeTab === 1) {
        tabContentData = dummyData.developerResources.sections || [];
    } else {
        tabContentData = dummyData.faqs.sections || [];
    }

    return (
        <div className={styles.devTabsContainer}>
            {/* pinnedArea = Banner + tabBar */}
            <div className={styles.pinnedArea}>
                <div
                    className={styles.banner}
                    style={{ backgroundImage: `url("${bannerImage}")` }}
                >
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>

                <div className={styles.tabBar}>
                    <button
                        onClick={() => setActiveTab(0)}
                        className={`${styles.tabButton} ${activeTab === 0 ? styles.active : ""}`}
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        className={`${styles.tabButton} ${activeTab === 1 ? styles.active : ""}`}
                    >
                        Developer Resources
                    </button>
                    <button
                        onClick={() => setActiveTab(2)}
                        className={`${styles.tabButton} ${activeTab === 2 ? styles.active : ""}`}
                    >
                        FAQs
                    </button>
                </div>
            </div>

            {/* tabContent is scrollable, only for the textual/data content */}
            <div className={styles.tabContent}>
                {tabContentData.map((block, idx) => {
                    return renderBlock(block, idx);
                })}
            </div>
        </div>
    );
};

// Helper to render each block type
function renderBlock(block, idx) {
    switch (block.type) {
        case "h2":
            return <h2 key={idx}>{block.content}</h2>;
        case "h4":
            return <h4 key={idx}>{block.content}</h4>;
        case "p":
            return <p key={idx}>{block.content}</p>;
        case "pBold":
            return <p key={idx} style={{ fontWeight: "bold" }}>{block.content}</p>;
        case "pItalicSmall":
            return <p key={idx} style={{ fontStyle: "italic", fontSize: "14px" }}>{block.content}</p>;
        case "img":
            return <img key={idx} src={block.src} alt="placeholder" style={{ margin: "16px 0" }} />;
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
        case "spacing":
            return <div key={idx} style={{ height: block.height || 16 }} />;
        case "gettingHelp":
            return (
                <GettingHelpInternal/>
            );
        default:
            return <div key={idx}>[Unknown block type]</div>;
    }
}

export default DevTabs;

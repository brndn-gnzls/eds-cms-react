// src/components/ComponentTabs/ComponentTabs.js

import React, { useState } from "react";
import styles from "./ComponentTabs.module.css";
import GettingHelpInternal from "../../components/GettingHelpInteral/GettingHelpInternal";
import LargeAccordion from "../LargeAccordion/LargeAccordion";

export default function ComponentTabs({
                                          currentBrand = "Anthem",
                                          bannerHeading,
                                          bannerBody,
                                          tabsData = [],
                                      }) {
    const [activeIndex, setActiveIndex] = useState(0);

    let brandPrefix = "anthem-";
    if (currentBrand === "Healthy Blue") brandPrefix = "healthyblue-";
    if (currentBrand === "Wellpoint") brandPrefix = "wellpoint-";

    const handleTabClick = (idx) => setActiveIndex(idx);
    const currentBlocks = tabsData[activeIndex]?.blocks || [];

    return (
        <div className={styles.componentTabsContainer}>
            <div className={styles.pinnedArea}>
                <div className={styles.banner}>
                    <h1>{bannerHeading}</h1>
                    <p>{bannerBody}</p>
                </div>
                <div className={styles.tabBar}>
                    {tabsData.map((tab, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={styles.tabContent}>
                {currentBlocks.map((block, i) => renderBlock(block, i, brandPrefix))}
            </div>
        </div>
    );
}

function renderBlock(block, idx, brandPrefix) {
    switch (block.type) {
        case "h2":
            return <h2 key={idx}>{block.content}</h2>;
        case "h3":
            return <h3 key={idx}>{block.content}</h3>;
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
        case "hr":
            return (
                <hr
                    key={idx}
                    style={{ border: 0, borderTop: "1px solid #eeeeee", margin: "16px 0" }}
                />
            );
        case "img": {
            const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${block.src}`;
            return (
                <img
                    key={idx}
                    src={finalSrc}
                    alt="component detail"
                    style={{ margin: "16px 0", maxWidth: "100%", height: "auto" }}
                />
            );
        }
        case "demoPlaceholder":
            return (
                <div
                    key={idx}
                    style={{
                        width: "650px",
                        height: "340px",
                        border: "1px solid #eee",
                        margin: "16px 0",
                    }}
                />
            );
        case "gettingHelpInternal":
            return <GettingHelpInternal key={idx} />;
        case "largeAccordion":
            return <LargeAccordion key={idx} />;
        case "bestPracticeDo":
            return (
                <div key={idx} className={styles.bpBlock}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div
                            className={styles.bpIconCircle}
                            style={{ backgroundColor: block.content.color }}
                        >
                            ✓
                        </div>
                        <p style={{ color: block.content.color, fontWeight: "bold" }}>
                            {block.content.title}
                        </p>
                    </div>
                    <p>{block.content.body}</p>
                    <img
                        src={`/images/componentDetailAssets/button/overview/${brandPrefix}${block.content.img}`}
                        alt="best practice do"
                        style={{ marginTop: "16px", maxWidth: "100%" }}
                    />
                </div>
            );
        case "bestPracticeDont":
            return (
                <div key={idx} className={styles.bpBlock}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <div
                            className={styles.bpIconCircle}
                            style={{ backgroundColor: block.content.color }}
                        >
                            ✗
                        </div>
                        <p style={{ color: block.content.color, fontWeight: "bold" }}>
                            {block.content.title}
                        </p>
                    </div>
                    <p>{block.content.body}</p>
                    <img
                        src={`/images/componentDetailAssets/button/overview/${brandPrefix}${block.content.img}`}
                        alt="best practice dont"
                        style={{ marginTop: "16px", maxWidth: "100%" }}
                    />
                </div>
            );
        default:
            return (
                <div key={idx} style={{ color: "red" }}>
                    [Unknown block: {block.type}]
                </div>
            );
    }
}

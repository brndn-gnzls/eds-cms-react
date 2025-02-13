// src/pages/ComponentDetailPage/ComponentDetailPage.js

import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";

// Overview is still static for now
// import { getOverviewBlocks } from "./OverviewBlocks";

// If you want to remove the static usageBlocks import entirely, you can.
// But here, we’re showing how to fully replace it with dynamic data from Strapi.
// import { usageBlocks } from "./UsageBlocks";

//
// 1) GraphQL Query for both Usage & Accessibility
//    We filter by slug="button" if you plan on making it dynamic in the future,
//    you can add a variable, but for now we’ll keep it hard-coded for demonstration.
//
const GET_COMPONENT_DETAIL = gql`
    query GetComponentDetail {
        componentDetailPages_connection {
            nodes {
                slug
                Usage {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksImageBlock {
                        folder
                        src
                    }
                    ... on ComponentSharedBlocksItalicCaptionSmall {
                        content
                    }
                }

                Accessibility {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentAccessibilityBlocksAccessibilityTableBlock {
                        row {
                            componentName
                            componentStatus
                            test
                        }
                    }
                    ... on ComponentBulletListBlockBulletListBlock {
                        items {
                            boldLead
                            body
                        }
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksGettingHelpInternalBlock {
                        insert
                    }
                }

                Overview {
                    __typename
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                    ... on ComponentParagraphBlocksParagraphBlock {
                        content
                    }
                    ... on ComponentSpacingBlocksSpacingBlock {
                        height
                    }
                    ... on ComponentSharedBlocksHorizontalRuleBlock {
                        style
                    }
                    ... on ComponentSharedBlocksImageBlock {
                        folder
                        src
                    }
                    ... on ComponentSharedBlocksItalicCaptionSmall {
                        content
                    }
                    ... on ComponentSharedBlocksGettingHelpInternalBlock {
                        insert
                    }
                    ... on ComponentBulletListBlockBulletListBlock {
                        items {
                            boldLead
                            body
                        }
                    }
                    ... on ComponentIconsBulletListIcon {
                        content
                    }
                    ... on ComponentGridsImageHeadlineCopyGrid {
                        appearanceData {
                            imageSrc
                            heading
                            description
                        }
                    }
                    ... on ComponentGridsStatesSectionBlock {
                        heading
                        introParagraph
                        leftImages {
                            src
                        }
                        rightStates {
                            boldTitle
                            paragraph
                        }
                    }
                }
            }
        }
    }
`;

/**
 * 2) Transform Helpers
 *    - If you want, you can combine them into one
 *      (since usage & accessibility block shapes are similar).
 *    - We’ll keep separate for clarity.
 */

// Accessibility transform
function transformAccessibilityBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentAccessibilityBlocksAccessibilityTableBlock":
                return {
                    type: "accessibilityTable",
                    rows: (block.row || []).map((r) => ({
                        component: r.componentName || "",
                        status: r.componentStatus || "",
                        test: r.test || "",
                    })),
                };


            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown block type: ${block.__typename}]`,
                };
        }
    });
}

// Usage transform
function transformUsageBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentSharedBlocksItalicCaptionSmall":
                return {
                    type: "pItalicSmall",
                    content: block.content || null,
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksImageBlock":
                // e.g. folder: "componentDetailUsage", src: "img-button-usage-desktop-light-001.svg"
                return {
                    type: "img",
                    folder: block.folder || "",
                    src: block.src || "",
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown usage block: ${block.__typename}]`,
                };
        }
    });
}

// overview transform
function transformOverviewBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        switch (block.__typename) {
            case "ComponentHeadingBlocksHeadingBlock":
                return {
                    type: block.headingLevel || "h2",
                    content: block.headingText || "",
                };

            case "ComponentSharedBlocksItalicCaptionSmall":
                return {
                    type: "pItalicSmall",
                    content: block.content || null,
                };

            case "ComponentParagraphBlocksParagraphBlock":
                return {
                    type: "p",
                    content: block.content || "",
                };

            case "ComponentSpacingBlocksSpacingBlock":
                return {
                    type: "spacing",
                    height: block.height || 16,
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksImageBlock":
                // e.g. folder: "componentDetailUsage", src: "img-button-usage-desktop-light-001.svg"
                return {
                    type: "img",
                    folder: block.folder || "",
                    src: block.src || "",
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };

            case "ComponentBulletListBlocksBulletListBlock":
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
                };

            case "ComponentBulletListBlockBulletListBlock":
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
                };

            case "ComponentIconsBulletListIcon":
                return {
                    type: "pBold",
                    content: block.content || null,
                }

            case "ComponentGridsImageHeadlineCopyGrid":
                return {
                    type: "appearanceSection",
                    appearanceData: (block.appearanceData || []).map((item) => ({
                        imageSrc: item.imageSrc || "",
                        heading: item.heading || "",
                        description: item.description || "",
                    })),
                };

            case "ComponentGridsStatesSectionBlock":
                return {
                    type: "statesSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    leftImages: (block.leftImages || []).map((img) => img.src || ""),
                    rightStates: (block.rightStates || []).map((state) => ({
                        boldTitle: state.boldTitle || "",
                        paragraph: state.paragraph || "",
                    })),
                };

            default:
                return {
                    type: "unknown",
                    content: `[Unknown usage block: ${block.__typename}]`,
                };
        }
    });
}

const ComponentDetailPage = () => {
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    // 3) Execute the query
    //    If you want to filter by slug, you can adjust the query or pass a variable.
    //    Right now, we just fetch all nodes and pick the 'button' entry.
    const { loading, error, data } = useQuery(GET_COMPONENT_DETAIL);

    const bannerHeading = "Button";
    const bannerBody =
        "Buttons initiate actions, with their labels clearly indicating what will happen when interacted with by users, ensuring an intuitive user experience.";

    if (loading) return <p>Loading detail page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 4) Extract & find the “button” entry specifically
    const detailNodes = data?.componentDetailPages_connection?.nodes || [];
    const detailEntry = detailNodes.find((node) => node.slug === "button");

    if (!detailEntry) {
        return <p>No component detail found for “button”.</p>;
    }

    // 5) Transform usage + accessibility
    const rawUsageBlocks = detailEntry.Usage || [];
    const dynamicUsageBlocks = transformUsageBlocks(rawUsageBlocks);

    const rawAccessibilityBlocks = detailEntry.Accessibility || [];
    const dynamicAccessibilityBlocks = transformAccessibilityBlocks(rawAccessibilityBlocks);

    const rawOverviewBlocks = detailEntry.Overview || [];
    const dynamicOverviewBlocks = transformOverviewBlocks(rawOverviewBlocks);

    // 6) Tabs:
    //    - “Overview” -> still static,
    //    - “Usage” -> dynamic,
    //    - “Accessibility” -> dynamic
    const tabsData = [
        {
            label: "Overview",
            blocks: dynamicOverviewBlocks,
        },
        {
            label: "Usage",
            blocks: dynamicUsageBlocks,
        },
        {
            label: "Accessibility",
            blocks: dynamicAccessibilityBlocks,
        },
    ];

    return (
        <>
            <GlobalNav
                showBrandSwitcher
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />
                <div className={styles.rightSide}>
                    <ComponentTabs
                        currentBrand={currentBrand}
                        bannerHeading={bannerHeading}
                        bannerBody={bannerBody}
                        tabsData={tabsData}
                    />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default ComponentDetailPage;

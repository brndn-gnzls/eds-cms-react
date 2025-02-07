import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";

// The other tabs remain static for now
import { getOverviewBlocks } from "./OverviewBlocks";
import { usageBlocks } from "./UsageBlocks";
// import { getAccessibilityBlocks } from "./AccessibilityBlocks"; // We'll replace this now

// 1) Minimal GraphQL query for “Accessibility” only
const GET_COMPONENT_DETAIL = gql`
    query {
        componentDetailPages_connection {
            nodes {
                slug
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
            }
        }
    }
`;

/**
 * 2) Our transform helper
 * - Right now, we only handle heading blocks
 * - Later, we’ll expand for paragraphs, bullet lists, etc.
 */
function transformAccessibilityBlocks(strapiBlocks = []) {
    return strapiBlocks.map((block) => {
        // Identify the Strapi block by its __typename
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
                    height: block.height || 16, // fallback if needed
                };

            case "ComponentAccessibilityBlocksAccessibilityTableBlock":
                // "row" is your repeatable field array
                // e.g., [{ componentName, componentStatus, test }, ...]
                return {
                    type: "accessibilityTable",
                    rows: (block.row || []).map((r) => ({
                        component: r.componentName || "",
                        status: r.componentStatus || "",
                        test: r.test || "",
                    })),
                };

            case "ComponentSharedBlocksHorizontalRuleBlock":
                // Optionally capture block.style if you plan to use it
                return {
                    type: "hr",
                    style: block.style || null,
                };

            case "ComponentSharedBlocksGettingHelpInternalBlock":
                // Optionally capture block.insert if needed
                return {
                    type: "gettingHelpInternal",
                    insert: block.insert || null,
                };


            case "ComponentBulletListBlockBulletListBlock":
                // "items" is your repeatable field with { boldLead, body }
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
                };

            default:
                // For any block type you haven't handled yet
                return {
                    type: "unknown",
                    content: `[Unknown block type: ${block.__typename}]`,
                };
        }
    });
}

const ComponentDetailPage = () => {
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    // 3) Execute the query for slug = “button”
    const { loading, error, data } = useQuery(GET_COMPONENT_DETAIL, {
        variables: { slug: "button" },
    });

    // For the other tabs, remain static
    const bannerHeading = "Button";
    const bannerBody =
        "Buttons initiate actions, with their labels clearly indicating what will happen when interacted with by users, ensuring an intuitive user experience.";

    // 4) Handle loading/error
    if (loading) {
        return <p>Loading detail page...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // 5) Extract the returned data
    //    Because we used `componentDetailPages_connection`, the data structure is data.componentDetailPages_connection.nodes
    const detailNodes = data.componentDetailPages_connection?.nodes || [];
    if (detailNodes.length < 1) {
        return <p>No component detail found for “button”.</p>;
    }

    // Let’s assume the first node is the correct record for this slug
    const detailEntry = detailNodes[0];

    // 6) Transform the “Accessibility” blocks
    const rawAccessibilityBlocks = detailEntry.Accessibility || [];
    const dynamicAccessibilityBlocks = transformAccessibilityBlocks(rawAccessibilityBlocks);

    // 7) Build the final `tabsData`.
    //    - Overview & Usage are still from local static
    //    - Accessibility is from the dynamic data
    const tabsData = [
        {
            label: "Overview",
            blocks: getOverviewBlocks(),
        },
        {
            label: "Usage",
            blocks: usageBlocks(),
        },
        {
            label: "Accessibility",
            blocks: dynamicAccessibilityBlocks, // dynamic now!
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

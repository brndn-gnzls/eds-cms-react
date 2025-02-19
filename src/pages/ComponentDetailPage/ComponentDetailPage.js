
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {useParams} from "react-router-dom";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";
const GET_COMPONENT_DETAIL = gql`
    query GetComponentDetailPages {
        componentDetailPages_connection {
            nodes {
                slug
                # (Optional) If you have these fields in Strapi, uncomment:
                # bannerHeading
                # bannerBody

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
                    ... on ComponentOverviewBlocksSizeSectionBlock {
                        heading
                        introParagraph
                        imageSrc
                        italicParagraph
                        tableHeadings {
                            size
                            description
                        }
                        tableRows {
                            size
                            description
                            metrics
                        }
                    }
                    ... on ComponentSharedBlocksParagraphHeadline {
                        headline
                    }
                    ... on ComponentGridsMetricSectionBlock {
                        heading
                        introParagraph
                        row1Left {
                            imageSrc
                            description
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row1Right {
                            imageSrc
                            description
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row2Left {
                            imageSrc
                            description
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                        row2Right {
                            imageSrc
                            description
                            topSpacing
                            bulletList {
                                items {
                                    boldLead
                                    body
                                }
                            }
                            postBulletParagraph
                        }
                    }
                    ... on ComponentGridsBestPracticesSectionBlock {
                        heading
                        introParagraph
                        doItems {
                            bestPracticeItem {
                                title
                                color
                                symbol
                                paragraph
                                imageSrc
                            }
                        }
                        dontItems {
                            bestPracticeItem {
                                title
                                color
                                symbol
                                paragraph
                                imageSrc
                            }
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

            case "ComponentBulletListBlockBulletListBlock":
                return {
                    type: "bulletList",
                    bullets: (block.items || []).map((item) => ({
                        boldLead: item.boldLead || "",
                        body: item.body || "",
                    })),
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

function transformTableHead(tableHeadings = []) {
    if (!tableHeadings.length) {
        return ["Size", "Description", ""];
    }
    const first = tableHeadings[0];
    return [
        first.size || "Size",
        first.description || "Description",
        ""
    ];
}


function transformMetricsRowArray(rowArr) {
    if (!rowArr || rowArr.length === 0) {
        return null;
    }

    const row = rowArr[0];
    let bulletItems = [];

    if (row.bulletList && row.bulletList.length > 0) {
        const firstBulletList = row.bulletList[0];
        bulletItems = (firstBulletList.items || []).map((item) => ({
            boldLead: item.boldLead || "",
            body: item.body || "",
        }));
    }

    return {
        imageSrc: row.imageSrc || "",
        description: row.description || "",
        topSpacing: row.topSpacing || 0,
        bulletList: bulletItems,
        postBulletParagraph: row.postBulletParagraph || "",
    };
}
function transformBestPracticeItems(itemsArr) {
    if (!itemsArr || itemsArr.length === 0) return [];

    return itemsArr.flatMap((outer) => {
        const arr = outer.bestPracticeItem || [];
        return arr.map((bp) => ({
            title: bp.title || "",
            color: bp.color || "",
            symbol: bp.symbol || "",
            paragraph: bp.paragraph || "",
            imageSrc: bp.imageSrc || "",
        }));
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
            case "ComponentOverviewBlocksSizeSectionBlock":
                return {
                    type: "sizeSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    imageSrc: block.imageSrc || "",
                    italicParagraph: block.italicParagraph || "",
                    tableHead: transformTableHead(block.tableHeadings),
                    tableRows: (block.tableRows || []).map((row) => ({
                        size: row.size || "",
                        description: row.description || "",
                        metrics: row.metrics || "",
                    })),
                };

            case "ComponentSharedBlocksParagraphHeadline":
                return {
                    type: "pBold",
                    content: block.headline || null,
                }

            case "ComponentGridsMetricSectionBlock":
                return {
                    type: "metricsSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    row1Left: transformMetricsRowArray(block.row1Left),
                    row1Right: transformMetricsRowArray(block.row1Right),
                    row2Left: transformMetricsRowArray(block.row2Left),
                    row2Right: transformMetricsRowArray(block.row2Right),
                };

            case "ComponentGridsBestPracticesSectionBlock":
                return {
                    type: "bestPracticesSection",
                    heading: block.heading || "",
                    introParagraph: block.introParagraph || "",
                    doItems: transformBestPracticeItems(block.doItems),
                    dontItems: transformBestPracticeItems(block.dontItems),
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
    // 1) read param => e.g. "button", "checkbox", etc.
    const { slug } = useParams();

    function capitalizeFirst(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const [currentBrand, setCurrentBrand] = useState("Anthem");

    // 2) fetch all detail pages
    const { loading, error, data } = useQuery(GET_COMPONENT_DETAIL);

    if (loading) return <p>Loading detail page for {slug}...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 3) find the correct node
    const detailNodes = data?.componentDetailPages_connection?.nodes || [];
    const detailEntry = detailNodes.find((node) => node.slug === slug);

    if (!detailEntry) {
        return <p>No component detail found for “{slug}” in Strapi.</p>;
    }

    // 4) build banner text, either from Strapi fields or fallback to slug
    const bannerHeading =
        detailEntry.bannerHeading ||
        capitalizeFirst(slug);

    const bannerBody =
        detailEntry.bannerBody ||
        `Detailed documentation for the “${slug}” component, featuring overview, usage, and accessibility best practices.`;

    // 5) transform blocks from strapi
    const usageBlocks = transformUsageBlocks(detailEntry.Usage || []);
    const accessibilityBlocks = transformAccessibilityBlocks(detailEntry.Accessibility || []);
    const overviewBlocks = transformOverviewBlocks(detailEntry.Overview || []);

    // 6) tabs => Overview, Usage, Accessibility
    const tabsData = [
        { label: "Overview", blocks: overviewBlocks },
        { label: "Usage", blocks: usageBlocks },
        { label: "Accessibility", blocks: accessibilityBlocks },
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
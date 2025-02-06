// src/pages/ComponentDetailPage/ComponentDetailPage.js

import React, {useEffect, useState} from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";

import {useQuery, gql} from "@apollo/client";

import { getAccessibilityBlocks } from "./AccessibilityBlocks";
import { usageBlocks } from "./UsageBlocks";
// NEW import for overview
import { getOverviewBlocks } from "./OverviewBlocks";

const GET_HOME_MARKETING = gql`
    query ComponentDetailPages_connection {
        componentDetailPages_connection {
            nodes {
                slug
                title
                Accessibility {
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                }
                Overview {
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                }
                Usage {
                    ... on ComponentHeadingBlocksHeadingBlock {
                        headingText
                        headingLevel
                    }
                }
            }
        }
    }
`;

const ComponentDetailPage = () => {
    const {data} = useQuery(GET_HOME_MARKETING);

    const [currentBrand, setCurrentBrand] = useState("Anthem");

    const bannerHeading = "Button";
    const bannerBody =
        "Buttons initiate actions, with their labels clearly indicating what will happen when interacted with by users, ensuring an intuitive user experience.";

    const tabsData = [
        {
            label: "Overview",
            blocks: getOverviewBlocks(), // now imported from OverviewBlocks.js
        },
        {
            label: "Usage",
            blocks: usageBlocks(),
        },
        {
            label: "Accessibility",
            blocks: getAccessibilityBlocks(),
        },
    ];

    console.log(data);

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
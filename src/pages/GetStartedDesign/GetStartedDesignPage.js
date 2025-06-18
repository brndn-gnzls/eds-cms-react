// src/pages/GetStartedDesignPage/GetStartedDesignPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import DevTabs from "../../components/DevTabs/DevTabs";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import ResourceGrid from "../../components/ResourceGrid/ResourceGrid";

import styles from "./GetStartedDesignPage.module.css";

const GET_ALL_INTERNALS = gql`
    query GetAllInternals {
        gettingStartedInternals {
            slug
            bannerHeading
            bannerBody
            bannerImage
            tabs
            faqItems {
                label
                content
            }
        }
    }
`;

export default function GetStartedDesignPage() {
    const { loading, error, data } = useQuery(GET_ALL_INTERNALS, {
        // if you need pagination:
        // variables: { pagination: { page: 1, pageSize: 100 } },
    });
    if (loading) return <p>Loading Design Page…</p>;
    if (error)   return <p>Error: {error.message}</p>;

    const allInternals = data.gettingStartedInternals || [];
    const designPage = allInternals.find((entry) => entry.slug === "design");
    if (!designPage) {
        return <p>No design data found in Strapi</p>;
    }

    const {
        bannerHeading,
        bannerBody,
        bannerImage,
        tabs,
        faqItems,
    } = designPage;

    // Inject your real faqItems on any "largeAccordion" block
    const tabsData = tabs.map((tab) => ({
        label: tab.label,
        blocks: tab.blocks.map((block) =>
            block.type === "largeAccordion"
                ? {
                    type: "largeAccordion",
                    items: faqItems,
                }
                : block
        ),
    }));

    return (
        <>
            <GlobalNav />

            <div className={styles.containerRow}>
                <LeftRail />
                <div className={styles.rightSide}>
                    <ResourceGrid />
                    <DevTabs
                        bannerHeading={bannerHeading}
                        bannerBody={bannerBody}
                        bannerImage={bannerImage}
                        tabsData={tabsData}
                    />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
}
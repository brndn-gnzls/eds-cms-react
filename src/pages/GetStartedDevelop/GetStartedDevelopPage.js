import React from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import DevTabs from "../../components/DevTabs/DevTabs";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";

import styles from "./GetStartedDevelopPage.module.css";

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

export default function GetStartedDevelopPage() {
    const { loading, error, data } = useQuery(GET_ALL_INTERNALS, {
        variables: {
            // if you have pagination on this collection type, you can add:
            // pagination: { page: 1, pageSize: 100 }
        },
    });

    if (loading) return <p>Loading Develop Page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const allInternals = data.gettingStartedInternals || [];
    const developPage = allInternals.find((entry) => entry.slug === "develop");
    if (!developPage) {
        return <p>No develop data found in Strapi</p>;
    }

    const {
        bannerHeading,
        bannerBody,
        bannerImage,
        tabs,
        faqItems,
    } = developPage;

    // inject your real faqItems on any "largeAccordion" block
    const tabsData = tabs.map((tab) => ({
        label: tab.label,
        blocks: tab.blocks.map((block) => {
            if (block.type === "largeAccordion") {
                return {
                    type: "largeAccordion",
                    // pass the array of { label, content } from Strapi
                    items: faqItems,
                };
            }
            return block;
        }),
    }));

    return (
        <>
            <GlobalNav />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={styles.rightSide}>
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
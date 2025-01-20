// src/pages/GetStartedDesignPage/GetStartedDesignPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";

// Components for pinned nav, left rail, footer, and dev tabs.
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import DevTabs from "../../components/DevTabs/DevTabs";

// Styles for pinned layout / right side container
import styles from "./GetStartedDesignPage.module.css";

/**
 * Valid query to fetch all "gettingStartedInternals" items.
 * We'll filter client-side for slug === "design".
 */
const GET_ALL_INTERNALS = gql`
    query GetAllInternals {
        gettingStartedInternals {
            slug
            bannerHeading
            bannerBody
            bannerImage
            tabs
        }
    }
`;

const GetStartedDesignPage = () => {
    // 1) Execute the query to get an array of all internals
    const { loading, error, data } = useQuery(GET_ALL_INTERNALS);

    if (loading) return <p>Loading Design Page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 2) Among them, find the entry with slug === "design"
    const allInternals = data?.gettingStartedInternals || [];
    const designPage = allInternals.find((entry) => entry.slug === "design");

    if (!designPage) {
        return <p>No design data found in Strapi</p>;
    }

    // 3) Extract fields from designPage
    const { bannerHeading, bannerBody, bannerImage, tabs } = designPage;

    // 4) Render the pinned layout with left rail + DevTabs
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
                        tabsData={tabs} // pass the 3-tab array from Strapi
                    />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default GetStartedDesignPage;

// src/pages/GetStartedDevelopPage/GetStartedDevelopPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import DevTabs from "../../components/DevTabs/DevTabs";

// Local CSS module for pinned layout / .rightSide styling
import styles from "./GetStartedDevelopPage.module.css";

/**
 * Valid query that returns an array of gettingStartedInternals.
 * Each item in the array has { slug, bannerHeading, bannerBody, bannerImage, tabs }.
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

const GetStartedDevelopPage = () => {
    // 1) Fetch all "gettingStartedInternals"
    const { loading, error, data } = useQuery(GET_ALL_INTERNALS);

    if (loading) return <p>Loading Develop Page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 2) Among them, find the entry with slug === "develop"
    const allInternals = data?.gettingStartedInternals || [];
    const developPage = allInternals.find((entry) => entry.slug === "develop");

    if (!developPage) {
        return <p>No develop data found in Strapi</p>;
    }

    // 3) Extract relevant fields
    const { bannerHeading, bannerBody, bannerImage, tabs } = developPage;

    // 4) Render pinned layout with DevTabs
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
                        tabsData={tabs}
                    />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default GetStartedDevelopPage;

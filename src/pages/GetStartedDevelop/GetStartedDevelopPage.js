// src/pages/GetStartedDevelopPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./GetStartedDevelopPage.module.css";

/**
 * Strapi query: fetch all getStartedBanners,
 * then we'll find the one with slug === "develop".
 */
const GET_STARTED_BANNERS = gql`
    query GetStartedBanners {
        getStartedBanners {
            slug
            heading
            body
        }
    }
`;

const GetStartedDevelopPage = () => {
    // 1) Run the query
    const { loading, error, data } = useQuery(GET_STARTED_BANNERS);

    if (loading) return <p>Loading Develop Page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 2) From the array, find the banner with slug "develop"
    const banners = data?.getStartedBanners || [];
    const developBanner = banners.find((item) => item.slug === "develop");

    // 3) Fallback if not found
    const bannerHeading = developBanner?.heading || "Develop";
    const bannerBody =
        developBanner?.body ||
        "Placeholder copy for eDS develop path if no data found in Strapi.";
    const bannerImage =
        "/images/gettingStartedLanding/img-header-getstarted.jpg";

    return (
        <>
            <GlobalNav />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={`${styles.rightSide} min-h-screen`}>
                    {/* Banner at top (white text over background image) */}
                    <div
                        className={styles.banner}
                        style={{
                            backgroundImage: `url("${bannerImage}")`,
                        }}
                    >
                        <h1>{bannerHeading}</h1>
                        <p>{bannerBody}</p>
                    </div>

                    <div className={styles.postBannerSpace} />

                    {/* Intro text or any dev-specific content below the banner */}
                    <div className={styles.introText}>
                        <h2>Getting started with Development</h2>
                        <p>
                            This page will provide tools, resources, and best practices for
                            integrating eDS into your codebases. Whether you’re building new
                            features or refining existing ones, our design system ensures
                            consistent brand experiences.
                        </p>
                    </div>
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default GetStartedDevelopPage;

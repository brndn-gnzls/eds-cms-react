// src/pages/GetStartedDevelopPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";

import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import DevTabs from "../../components/DevTabs/DevTabs";
import styles from "./GetStartedDevelopPage.module.css";

/** Example banner query from Strapi */
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
    const { loading, error, data } = useQuery(GET_STARTED_BANNERS);

    if (loading) return <p>Loading Develop Page...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // find the "develop" banner
    const banners = data?.getStartedBanners || [];
    const developBanner = banners.find((b) => b.slug === "develop");

    const bannerHeading = developBanner?.heading || "Develop";
    const bannerBody =
        developBanner?.body ||
        "Placeholder text for the eDS 'Develop' path if no data found in Strapi.";
    const bannerImage =
        "/images/gettingStartedLanding/img-header-getstarted.jpg";

    return (
        <>
            <GlobalNav />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                {/* Right side content */}
                <div className={`${styles.rightSide}`}>
                    {/*
            Sticky container combining the banner + tab interface
            pinned under the nav at top: 78px
          */}
                    <div className={styles.bannerAndTabs}>
                        {/* The banner portion */}
                        <div
                            className={styles.banner}
                            style={{
                                backgroundImage: `url("${bannerImage}")`,
                            }}
                        >
                            <h1>{bannerHeading}</h1>
                            <p>{bannerBody}</p>
                        </div>

                        {/* The tab interface portion */}
                        <DevTabs />
                    </div>
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default GetStartedDevelopPage;

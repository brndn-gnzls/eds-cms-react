// src/pages/GettingStartedPage/GettingStartedPage.js

import React from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import styles from "./GettingStartedPage.module.css";

const GettingStartedPage = () => {
    return (
        <>
            <GlobalNav />

            {/*
        Container centered at max width (like the homepage),
        with left rail pinned. The right content is in .rightSide area.
      */}
            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={`${styles.rightSide} min-h-screen`}>
                    {/* 1) Banner at top of right side */}
                    <div
                        className={styles.banner}
                        style={{
                            backgroundImage: `url("/images/gettingStartedLanding/img-header-getstarted.jpg")`,
                        }}
                    >
                        <h1>Get Started</h1>
                        <p>
                            Get started with eDS to streamline your workflow and maintain consistency
                            across every aspect of our design system.
                        </p>
                    </div>

                    {/* 2) 48px spacing under the banner → done in CSS or a margin class */}
                    <div className={styles.postBannerSpace} />

                    {/* 3) 96px from the left rail → we apply margin-left in CSS */}
                    <div className={styles.contentArea}>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GettingStartedPage;

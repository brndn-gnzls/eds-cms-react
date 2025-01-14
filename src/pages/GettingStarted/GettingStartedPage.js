// src/pages/GettingStartedPage/GettingStartedPage.js

import React from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import Accordion from "../../components/Accordion/Accordion"; // We'll create this next.
import styles from "./GettingStartedPage.module.css";

const GettingStartedPage = () => {
    return (
        <>
            <GlobalNav />

            {/*
        Tailwind container or .container class for horizontal margins,
        plus a custom 2-column layout in CSS modules
      */}
            <div className={`container ${styles.getStartedLayout}`}>
                {/* Left column (fixed) */}
                <div className={styles.leftColumn}>
                    <Accordion />
                </div>

                {/* Right column (scrollable placeholder) */}
                <div className={styles.rightColumn}>
                    <h1>Getting Started Landing Page</h1>
                    <p>This area is for future content...</p>
                </div>
            </div>
        </>
    );
};

export default GettingStartedPage;

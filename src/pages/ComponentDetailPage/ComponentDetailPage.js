// src/pages/ComponentDetailPage/ComponentDetailPage.js

import React from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";

// We'll import ComponentTabs, which mirrors DevTabs, but with "Overview/Usage/Accessibility"
import ComponentTabs from "../../components/ComponentsTab/ComponentTabs";

/**
 * The route here is /component-detail/button (for example).
 * We'll do a static “Button” banner + partial tab data for now.
 * Eventually you can fetch from Strapi by slug, etc.
 */
const ComponentDetailPage = () => {
    // Example static data, or you can fetch from Strapi:
    const bannerHeading = "Button";
    const bannerBody =
        "Buttons initiate actions, with their labels clearly indicating what will happen when interacted with by users, ensuring an intuitive user experience.";

    // Hardcoded “tabsData” with 3 items: Overview, Usage, Accessibility.
    // For now, we can store minimal blocks or placeholders.
    const tabsData = [
        {
            label: "Overview",
            blocks: [
                // This is just a small placeholder to prove that the pinned area works.
                // You can fill with your actual <h2>, <p>, images, etc.
                // If you’d prefer, you can replicate the "renderBlock" approach or do a separate approach.
                { type: "h2", content: "Overview Content Here" },
                { type: "p", content: "This is the Button overview tab." },
            ],
        },
        {
            label: "Usage",
            blocks: [
                { type: "h2", content: "Usage Content Here" },
                { type: "p", content: "This is the Usage tab for the Button." },
            ],
        },
        {
            label: "Accessibility",
            blocks: [
                { type: "h2", content: "Accessibility Content Here" },
                { type: "p", content: "This is the Accessibility tab for the Button." },
            ],
        },
    ];

    return (
        <>
            <GlobalNav />
            {/* The container pinned layout exactly like /get-started/develop */}
            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={styles.rightSide}>
                    <ComponentTabs
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

// src/components/ComponentDetailAppearance/ComponentDetailAppearance.js

import React from "react";
import styles from "./ComponentDetailAppearance.module.css";

function ComponentDetailAppearance({ brandPrefix = "anthem-", blocks = [] }) {
    /**
     * blocks is an array of objects, each object shaped like:
     * {
     *   imageSrc: "img-button-options-desktop-light-001.svg",
     *   heading: "Primary",
     *   description: "For the principal call to action..."
     * }
     *
     * We'll place "appearance" heading + paragraph at the top,
     * then a 2-col responsive grid for the blocks.
     */

    return (
        <div className={styles.appearanceWrapper}>
            {/* Intro heading & paragraph */}
            <h3>Appearance</h3>
            <p>
                Each button type has distinct visual and functional traits to support various
                roles, from primary actions to subtle prompts. This section covers appearance
                options, states, and best practices to create a consistent, intuitive user
                experience.
            </p>
            <div style={{ height: "24px" }} />

            {/* Responsive 2-col grid => map over blocks => two blocks per row */}
            <div className={styles.appearanceGrid}>
                {blocks.map((block, index) => {
                    // final brand-based image => e.g. "anthem-img-button-options-desktop-light-001.svg"
                    const finalSrc = `/images/componentDetailAssets/button/overview/${brandPrefix}${block.imageSrc}`;

                    return (
                        <div key={index} className={styles.appearanceBlock}>
                            <img
                                src={finalSrc}
                                alt="appearance block"
                                className={styles.appearanceImage}
                            />
                            <div style={{ height: "16px" }} />
                            <p style={{ fontWeight: "bold" }}>{block.heading}</p>
                            <p>{block.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ComponentDetailAppearance;
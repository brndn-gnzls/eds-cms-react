// src/components/HomeMasthead/HomeMasthead.js
import React from "react";
import styles from "./HomeMasthead.module.css";

const HomeMasthead = () => {
    return (
        <div className={styles.mastheadWrapper}>
            <span className={styles.gradientContainer}>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientBackdrop}></span>
            </span>

            {/* CTA lock-up (no absolute positioning) */}
            <div className={styles.mastheadContent}>
                <h1>Unify Your Vision,<br/>Elevate Your Design.</h1>
                <p>
                    eDS is Elevance Health's enterprise product design system, aiding in
                    upholding user experience integrity and maximizing design development
                    resources.
                </p>
                <div className={styles.ctaButtons}>
                    <button className={styles.getStartedBtn}>Get Started</button>
                    <button className={styles.componentsBtn}>Components</button>
                </div>
            </div>
        </div>
    );
};

export default HomeMasthead;
;
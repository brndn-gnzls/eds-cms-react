import React from "react";
import styles from "./GettingStartedPath.module.css";

const GettingStartedPath = ({ icon, heading, body }) => {
    return (
        <div className={styles.pathWrapper}>
            {/* Left column: 24x24 icon */}
            <div className={styles.iconCol}>
                <img src={icon} alt="icon" />
            </div>

            {/* Middle column: heading + text */}
            <div className={styles.textCol}>
                <p className={styles.heading}>{heading}</p>
                <p className={styles.bodyText}>{body}</p>
            </div>

            {/* Right column: caret pointing right, spaced 34px from text */}
            <div className={styles.caretCol}>
                <span className={styles.caret}>˃</span>
            </div>
        </div>
    );
};

export default GettingStartedPath;

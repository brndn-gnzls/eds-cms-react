// src/components/GettingStartedPath/GettingStartedPath.js

import React from "react";
import { Link } from "react-router-dom"; // or remove if using <a>
import styles from "./GettingStartedPath.module.css";

const GettingStartedPath = ({ icon, heading, body, link }) => {
    return (
        <Link to={link} className={styles.pathWrapper}>
            <div className={styles.iconCol}>
                <img src={icon} alt="icon" />
            </div>

            <div className={styles.textCol}>
                <p className={styles.heading}>{heading}</p>
                <p className={styles.bodyText}>{body}</p>
            </div>

            <div className={styles.caretCol}>
                <span className={styles.caret}>˃</span>
            </div>
        </Link>
    );
};

export default GettingStartedPath;

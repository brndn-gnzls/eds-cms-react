// HomeMasthead.js
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./HomeMasthead.module.css";
import { Link } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const GET_HOME_MASTHEAD = gql`
    query GetHomeMasthead {
        homeMasthead {
            title
            description
            button1Label
            button2Label
        }
    }
`;

const COMPONENT_NAME = "HomeMasthead";

const HomeMasthead = () => {
    const { loading, error, data } = useQuery(GET_HOME_MASTHEAD);
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        startLoading(COMPONENT_NAME);
        return () => stopLoading(COMPONENT_NAME);
    }, [startLoading, stopLoading]);

    useEffect(() => {
        if (!loading) stopLoading(COMPONENT_NAME);
    }, [loading, stopLoading]);

    if (loading || error) return null;

    const { title, description, button1Label, button2Label } = data.homeMasthead;

    return (
        <div className={styles.mastheadWrapper}>
            <span className={styles.gradientContainer}>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientColor}></span>
                <span className={styles.gradientBackdrop}></span>
            </span>
            <div className={styles.mastheadContent}>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className={styles.ctaButtons}>
                    <Link to="/get-started">
                        <button className={styles.getStartedBtn}>{button1Label}</button>
                    </Link>
                    <Link to="/components">
                        <button className={styles.componentsBtn}>{button2Label}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeMasthead;

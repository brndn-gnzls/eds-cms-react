import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./HomeMarketing.module.css";

const GET_HOME_MARKETING = gql`
    query GetHomeMarketing {
        homeMarketing {
            heading2
            heading3
            paragraph
            buttonLabel
            imageUrl
        }
    }
`;

const HomeMarketing = () => {
    const { loading, error, data } = useQuery(GET_HOME_MARKETING);

    if (loading) return <p>Loading Marketing Section...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { heading2, heading3, paragraph, buttonLabel, imageUrl } = data.homeMarketing;

    return (
        <section className={styles.marketingWrapper}>
            {/* Left Column: text lockup */}
            <div className={styles.leftColumn}>
                <h2>{heading2}</h2>
                <h3>{heading3}</h3>
                <p>{paragraph}</p>
                <button className={styles.tryItBtn}>{buttonLabel}</button>
            </div>

            <div
                className={styles.rightColumn}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
        </section>
    );
};

export default HomeMarketing;

// src/components/GlobalFooter/GlobalFooter.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./GlobalFooter.module.css";

// GraphQL Query for your Footer single type
const GET_FOOTER = gql`
    query GetFooter {
        footer {
            footerColumn1Header
            footerColumn1Body
            footerColumn2Header
            footerColumn2Body
            footerColumn3Header
            footerColumn3Body
            footerColumn4Header
            footerColumn4Body
            footerColumn5Header
            footerColumn5Body
            legalNotice
        }
    }
`;

const GlobalFooter = () => {
    // Execute the query
    const { loading, error, data } = useQuery(GET_FOOTER);

    // Handle loading/error states
    if (loading) return <p>Loading Footer...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Extract the footer data
    const footerData = data?.footer ?? {};

    return (
        <footer className={styles.footerContainer}>
            {/* Row 1: 5 columns (132px tall in your design spec) */}
            <div className={styles.footerRow1}>
                {/* Column 1 */}
                <div>
                    <div className={styles.columnHeader}>
                        {footerData.footerColumn1Header}
                    </div>
                    <div className={styles.columnBody}>
                        {footerData.footerColumn1Body}
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <div className={styles.columnHeader}>
                        {footerData.footerColumn2Header}
                    </div>
                    <div className={styles.columnBody}>
                        {footerData.footerColumn2Body}
                    </div>
                </div>

                {/* Column 3 */}
                <div>
                    <div className={styles.columnHeader}>
                        {footerData.footerColumn3Header}
                    </div>
                    <div className={styles.columnBody}>
                        {footerData.footerColumn3Body}
                    </div>
                </div>

                {/* Column 4 */}
                <div>
                    <div className={styles.columnHeader}>
                        {footerData.footerColumn4Header}
                    </div>
                    <div className={styles.columnBody}>
                        {footerData.footerColumn4Body}
                    </div>
                </div>

                {/* Column 5 */}
                <div>
                    <div className={styles.columnHeader}>
                        {footerData.footerColumn5Header}
                    </div>
                    <div className={styles.columnBody}>
                        {footerData.footerColumn5Body}
                    </div>
                </div>
            </div>

            {/* Row 2: 182px tall in your design (optional) */}
            <div className={styles.footerRow2}>
                {/* Add any additional content needed here */}
            </div>

            {/* Row 3: 85px tall, for the legal notice */}
            <div className={styles.legalRow}>
                {footerData.legalNotice}
            </div>
        </footer>
    );
};

export default GlobalFooter;

// src/components/GlobalFooter/GlobalFooter.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./GlobalFooter.module.css";

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

/**
 * Helper to turn newline-delimited text into <a> links.
 */
function renderLinks(text) {
    if (!text) return null;
    return text
        .split("\n")
        .filter(line => line.trim() !== "") // remove empty lines
        .map((line, i) => (
            <a key={i} href="someroute" className={styles.footerLink}>
                {line}
            </a>
        ));
}

const GlobalFooter = () => {
    const { loading, error, data } = useQuery(GET_FOOTER);

    if (loading) return <p>Loading Footer...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const footerData = data?.footer ?? {};

    return (
        <footer className={`divider util-bg-footer ${styles.footerContainer}`}>
            <div className={styles.footerRow1}>
                {/* Column 1 */}
                <div>
                    <div className={styles.columnHeader}>{footerData.footerColumn1Header}</div>
                    <div className={styles.columnBody}>
                        {renderLinks(footerData.footerColumn1Body)}
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <div className={styles.columnHeader}>{footerData.footerColumn2Header}</div>
                    <div className={styles.columnBody}>
                        {renderLinks(footerData.footerColumn2Body)}
                    </div>
                </div>

                {/* Column 3 */}
                <div>
                    <div className={styles.columnHeader}>{footerData.footerColumn3Header}</div>
                    <div className={styles.columnBody}>
                        {renderLinks(footerData.footerColumn3Body)}
                    </div>
                </div>

                {/* Column 4 */}
                <div>
                    <div className={styles.columnHeader}>{footerData.footerColumn4Header}</div>
                    <div className={styles.columnBody}>
                        {renderLinks(footerData.footerColumn4Body)}
                    </div>
                </div>

                {/* Column 5 */}
                <div>
                    <div className={styles.columnHeader}>{footerData.footerColumn5Header}</div>
                    <div className={styles.columnBody}>
                        {renderLinks(footerData.footerColumn5Body)}
                    </div>
                </div>
            </div>

            {/* Legal row at the bottom */}
            <div className={styles.legalRow}>
                {footerData.legalNotice}
            </div>
        </footer>
    );
};

export default GlobalFooter;

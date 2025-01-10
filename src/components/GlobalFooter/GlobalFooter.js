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
 * Helper to transform newline-delimited text into <a> links.
 */
function renderLinks(text) {
    if (!text) return null;
    return text
        .split("\n")
        .filter((line) => line.trim() !== "") // ignore empty lines
        .map((line, i) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={i} href="#" className={styles.footerLink}>
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
        // 1) Outermost footer is full-width
        //    so background color can fill the entire browser width.
        <footer className={`divider util-bg-footer ${styles.footerFullWidth}`}>
            {/* 2) Inside, we have a container for the 1128px constraint */}
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.footerRow1}>
                    {/* Column 1 */}
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn1Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn1Body)}</div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn2Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn2Body)}</div>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn3Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn3Body)}</div>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn4Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn4Body)}</div>
                    </div>

                    {/* Column 5 */}
                    <div>
                        <div className={styles.columnHeader}>{footerData.footerColumn5Header}</div>
                        <div className={styles.columnBody}>{renderLinks(footerData.footerColumn5Body)}</div>
                    </div>
                </div>

                <div className={styles.legalRow}>{footerData.legalNotice}</div>
            </div>
        </footer>
    );
};

export default GlobalFooter;
